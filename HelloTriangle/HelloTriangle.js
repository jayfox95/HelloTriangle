//HelloTriangle.js
//vertex shader program
var VSHADER_SOURCE = //this sets up a function that is called later whenm we init the shaders\
    'attribute vec4 a_Position;\n' + //says we are using the attribute for the point and calling it a(attribute)_position
    'void main(){\n' + //main function that gets called
    '   gl_Position = a_Position;\n' + //coordinates
    '}\n';

//fragment shader
var FSHADER_SOURCE = //this is a function that is called when we init shaders
    'void main() {\n' +
    '   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' + //setting the color for the triangle
    '}\n';

function main() {
    //retrieve canvas for the shape
    var canvas = document.getElementById('webgl');

    //gets the 3d rendering context foor webgl
    var gl = getWebGLContext(canvas); //creates a variable to get the context of our previous vcariable canvas
    if (!gl) { //if we cannot get the context then we return this error message
        console.log('Failed to get the rendering context for webGL');
        return;
    }

    //here we check to see if our shaders initialized
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize the shaders');
        return;
    }

    //write the positions of the vertices to our vertex shader
    var n = initVertexBuffers(gl); 
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    //here we say what the "cleared" color of the canvas will be
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //clears the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draws the triangle itself
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) { //this is where we actually set the positions of the vertices
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5 //these are the coordinates of the vertices stored in an artray for us
    ]);

    var n = 3; //this is the number of vertices and what is checkedf later

    //create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) { //error for if the buffer object can't be created
        console.log('Failed to create the buffer object');
        return -1;
    }

    //binds trhe buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //this writes data into the buffeer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) { //lets us know if everything is working
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }

    //assigns the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //enables assignment to a_position
    gl.enableVertexAttribArray(a_Position);


    return n; //this is what allows us to check
}


/*QUESTIONS
 * Why do some of the errors return 0 and some -1?
 -I'm having trouble with this one. I know that wwhne a return value is greater than or equal to zero, it is the location of the specified
 attribute variable. And if a return value is -1, the variable does not exist or its name starts with gl_ or webgl_, which is reserved and,
 therefore, is unallowed. I am unsure about errors though.
 * What exactly is a buffer object?
 -an area of memory that is able to store multiple vertices in the WebGL system. 
 It is used to store the vertex data as well as pass the vertices to a vertex shader.
 * 
 
 for Jeremy:
 *What are the benefits to creating an array that contains other arrays?
 *In what application would gl.LINE_LOOP be more useful than gl.LINE_STRIP?
*/
