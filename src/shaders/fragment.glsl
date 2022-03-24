uniform float uTime;
uniform float uIntensity;

varying vec2 vUV;

//random value
void main()
{

    //add color
    vec3 black = vec3(0.0);
    vec3 uvColor = vec3(vUV, 1.0);

    vec3 mixedColor = mix(black, uvColor, uIntensity);

    gl_FragColor = vec4(mixedColor, 1.0);


}