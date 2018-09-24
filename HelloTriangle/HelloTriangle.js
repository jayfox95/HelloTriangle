//HelloTriangle.js
//vertex shader program
var VSHADER_SOURCE = //this sets up a function that is called later whenm we init the shaders\
    'attribute vec4 a_Position;\n' + //says we are using the attribute for the point and calling it a(attribute)_position
    'void main() {\n' + //main function that gets called
    '   gl_Position = a_Position;\n' + //coordinates
    '}\n';

//fragment shader
var FSHADER_SOURCE = //this is a function that is called when we init shaders
    'void main() {\n' + // calling the main function
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + //setting the color for the triangle
    '}\n';

function main() { //setting up the main function
    //retrieve canvas for the shape
    var canvas = document.getElementById('webgl'); //in the DOM, get the element (that we are naming 'canvas') that has the ID 'webgl'
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    //gets the 3d rendering context foor webgl
    var gl = getWebGLContext(canvas); //creates a variable to get the context of our previous vcariable canvas
    if (!gl) { //if we cannot get the context then we return this error message
        console.log('Failed to get the rendering context for webGL'); //display message when the rendering context cannot be retrieved
        return;
    }

    //here we check to see if our shaders initialized
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) { //if the shaders cannot be initialized
        console.log('Failed to initialize the shaders'); //display message when the program fails to initialize shaders
        return;
    }

    //write the positions of the vertices to our vertex shader
    var n = initVertexBuffers(gl); //n is the number of vertices
    if (n < 0) { //if there are no vertices established
        console.log('Failed to set the positions of the vertices'); //display message when the vertices cannot be found
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
    var vertices = new Float32Array([ //typed array of float values
        0, 0.5, -0.5, -0.5, 0.5, -0.5 //these are the coordinates of the vertices stored in an artray for us
    ]);

    var n = 3; //this is the number of vertices and what is checkedf later

    //create a buffer object
    var vertexBuffer = gl.createBuffer(); //creates a buffer object called vertexBuffer
    if (!vertexBuffer) { //error for if the buffer object can't be created
        console.log('Failed to create the buffer object'); //display message when buffer object creation fails
        return -1;
    }

    //binds trhe buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //this writes data into the buffeer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); 
    if (a_Position < 0) { //lets us know if everything is working
        console.log('Failed to get the storage location of a_Position'); //display message when the location of a_Position cannot be found
        return -1;
    }

    //assigns the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //enables assignment to a_position
    gl.enableVertexAttribArray(a_Position);


    return n; //this is what allows us to check the number of vertices
}


/*QUESTIONS
 * Why do some of the errors return 0 and some -1?
 * What exactly is a buffer object?
 * 
*/
