uniform float uTime;
uniform float uIntensity;
uniform float uBlocks;
uniform sampler2D uTexture;
uniform vec2 uTextureResolution;
uniform vec2 uSurfaceResolution;

varying vec2 vUV;

//get right aspect ratio
vec2 getAspectRatio(vec2 uv, float surface_ratio, float texture_ratio) {
    //stretch the image as needed
    if(texture_ratio > surface_ratio) {
        //image is wider than canvas
        float ratio_diff = surface_ratio/texture_ratio;
        uv.x *= ratio_diff;
        uv.x += (1.0 - ratio_diff) / 2.0;
    } else {
        float ratio_diff = texture_ratio/surface_ratio;
        uv.y *= ratio_diff;
        uv.y += (1.0 - ratio_diff) / 2.0;
    }
    return uv;
}



//random value
void main()
{
    vec2 uv = vUV;
    float time = uTime;
    time *= 0.001;

    //get aspect ratios
    float surfaceRatio = uSurfaceResolution.x/uSurfaceResolution.y;
    float textureRatio = uTextureResolution.x/uTextureResolution.y;
    
    uv = getAspectRatio(uv, surfaceRatio, textureRatio);

    //have a safe border around the image to distort into / zoom the image in
    uv = mix(vec2(0.1), vec2(0.9), uv);


    //sample block instead of individual pixel
    vec2 block = vec2(
        floor(uv.x * uBlocks)/uBlocks,
        floor(uv.y * uBlocks)/uBlocks
    );

    vec2 distortion = 0.1 * vec2(
        sin(time*0.3 + block.x*5.0 + block.y*2.0), 
        cos(time*0.2 + block.x*5.5 + block.y*2.5)
        );

    //add color
    vec4 textureColor = texture2D(uTexture, uv + distortion);

    gl_FragColor = textureColor;


}