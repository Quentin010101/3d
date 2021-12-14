import * as THREE from '../three.js/build/three.module.js'
import { OrbitControls } from "../three.js/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//------------ Creation cube
const geometry = new THREE.BoxGeometry()
const loader = new THREE.CubeTextureLoader()
loader.setPath('../three.js/examples/textures/cube/pisa/')

const textureCube = loader.load([
    'pz.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
])
const material = new THREE.MeshBasicMaterial({ color: 5555, envMap: textureCube })
const cube = []
let index = 0

function createCube(parm) {
    let x = -(parm - 1)*0.5
    let y = -(parm - 1)*0.5
    let z = -(parm - 1)*0.5
    for (let i = 0; i < parm; i++) {
        x = -(parm - 1)*0.5
        for (let j = 0; j < parm; j++) {
            y = -(parm - 1)*0.5
            for (let k = 0; k < parm; k++) {
                cube[index] = new THREE.Mesh(geometry, material)
                cube[index].position.set(x, y, z)
                scene.add(cube[index])
                index++
                y++
            }
            x++
        }
        z++
    }
}
createCube(3)
function setCube( indexD ) {
    for (let i = 0; i < cube.length; i++) {
        
        let arr = [cube[i].position.x,cube[i].position.y, cube[i].position.z]

        for(let j = 0; j < arr.length; j++){
            let pos = arr[j]

            if(pos > 0){
                pos += indexD
            }else if(pos < 0){
                pos -= indexD
            }else{
    
            }
            arr[j] = pos
        }
        cube[i].position.set(arr[0],arr[1],arr[2])
    }
}
//-----------------------------

camera.position.set(1, 0, 20)

let timeStamp = 0

const controls = new OrbitControls(camera, renderer.domElement)





function animate() {
    requestAnimationFrame(animate)
    if(timeStamp < 75){
        setCube(0.1)
    }else if(timeStamp < 150){
        setCube(-0.1)
    } else{
        timeStamp = 0
    }
    renderer.render(scene, camera)
    controls.update()
    timeStamp ++
}
animate()




