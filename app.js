import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'


let height = window.innerHeight
let width = window.innerWidth
const world = document.querySelector('.world')

let scene, camera, renderer, control
let structure, forest, roche

let color = {
    white: 0xd8d0d1,
    blue: 0x85dde4,
    lightGrey:  0xc8c8c8 ,
    grey:  0x9c9c9c ,
    darkGrey:  0x5b5b5b ,
    brown: 0x733c0b,
    lightGreen: 0xb8eb63,
    darkGreen: 0x72a41f,
}

function createScene() {

    //-------scene
    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(color.lightGrey,300,1000)
    //-------camera
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.set(0, 250, 600)
    camera.lookAt(0, 0, 0)
    //-------renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2
    control = new OrbitControls(camera, renderer.domElement)


    world.appendChild(renderer.domElement)

}
function createLight() {
    const hemisphereLight = new THREE.HemisphereLight(0xbbe7f9 ,  0x8fc9e1, .4)

    const light = new THREE.DirectionalLight(color.white, 0.9)
    light.position.set(-10, 150, 100)
    light.castShadow = true

    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -60;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;

    // Shadow map size
    light.shadow.mapSize.width = 1044;
    light.shadow.mapSize.height = 1044;

    // scene.add(hemisphereLight)
    scene.add(light)
    scene.add(hemisphereLight)
}
function initialization() {
    createScene()
    createLight()
    createStructure()

    animation()
}
function animation() {
    structure.mesh.rotation.y +=0.001

    renderer.render(scene, camera)
    control.update()
    requestAnimationFrame(animation)
}


//-------class
let structureHauteur = 100
let structureLargeur = 200
class Structure {
    constructor() {
        this.mesh = new THREE.Object3D()


        const geometry = new THREE.CylinderGeometry(structureLargeur, 1, structureHauteur, 10, 1)
        const material = new THREE.MeshPhongMaterial({ color: color.lightGreen })

        const cylindre = new THREE.Mesh(geometry, material)
        cylindre.receiveShadow = true

        this.mesh.add(cylindre)
        this.stone()
        this.littleStone()
        this.ring()
        this.createTree()
        this.createRoche()
        this.createMaison()
    }
    createMaison(){
        let maison = new Maison()
        maison.mesh.position.x = -structureLargeur/4
        maison.mesh.position.z = structureLargeur/3.5
        maison.mesh.position.y = 52
        this.mesh.add(maison.mesh)
    }
    createTree(){
        forest = new Forest(30, 80)
        forest.mesh.position.y = 50
        forest.mesh.position.x = 35
        forest.mesh.position.z = 0
        this.mesh.add(forest.mesh)
    }
    createRoche(){
        function setRoche(object, x, y, z){
            let name = new Roche(5)
            name.mesh.position.x = x
            name.mesh.position.y = y
            name.mesh.position.z = z
            object.add(name.mesh)
        }
        setRoche(this.mesh, structureLargeur/2,50,structureLargeur/2)
        setRoche(this.mesh, structureLargeur/1.3,50,structureLargeur/3)
        setRoche(this.mesh, -structureLargeur/2.9,50,structureLargeur/1.5)
    }
    stone() {
        let hauteurObjet = 10
        const geometry = new THREE.DodecahedronGeometry(hauteurObjet, 0)
        const material = new THREE.MeshPhongMaterial({ color: color.darkGrey })

        let nbLoop = 20
        let positionY = structureHauteur / 2 - hauteurObjet
        let positionXZ = structureLargeur - hauteurObjet
        let nbRocher = 100
        let angle = 360 / nbRocher

        for (let j = 0; j < nbLoop; j++) {
            for (let i = 0; i < nbRocher; i++) {

                const pierre = new THREE.Mesh(geometry, material)
                pierre.position.y = positionY + Math.random() * 5 - Math.random() * 5
                pierre.position.z = Math.sin(angle * i) * positionXZ + Math.random() * 20 - Math.random() * 20
                pierre.position.x = Math.cos(angle * i) * positionXZ + Math.random() * 10 - Math.random() * 10

                pierre.rotation.x = Math.random()
                pierre.rotation.y = Math.random()
                pierre.rotation.z = Math.random()
                pierre.castShadow = true
                pierre.receiveShadow = true
                this.mesh.add(pierre)
            }
            positionY -= hauteurObjet
            positionXZ -= hauteurObjet
        }
    }
    littleStone() {
        let nbStone = 60
        let hauteurObjet = 8
        let angle = 360 / nbStone

        const geometry = new THREE.DodecahedronGeometry(hauteurObjet, 0)
        const material = new THREE.MeshPhongMaterial({ color: color.grey })
        let positionY = structureHauteur / 2
        let positionXZ = structureLargeur - hauteurObjet

        for (let i = 0; i < nbStone; i++) {
            const pierre = new THREE.Mesh(geometry, material)
            pierre.position.y = positionY + Math.random() * 5 - Math.random() * 5
            pierre.position.z = Math.sin(angle * i) * positionXZ + Math.random() * 20 - Math.random() * 20
            pierre.position.x = Math.cos(angle * i) * positionXZ + Math.random() * 10 - Math.random() * 10

            pierre.rotation.x = Math.random()
            pierre.rotation.y = Math.random()
            pierre.rotation.z = Math.random()
            pierre.castShadow = true
            pierre.receiveShadow = true
            this.mesh.add(pierre)
        }
    }
    ring() {
        let nbStone = 60
        let angle = 360 / nbStone

        const material = new THREE.MeshPhongMaterial({ color: color.lightGrey })
        let positionY = structureHauteur / 4
        let positionXZ = structureLargeur * 2

        for (let i = 0; i < nbStone; i++) {
            let hauteurObjet = (6 * Math.random() + 1)
            const geometry = new THREE.DodecahedronGeometry(hauteurObjet, 0)


            const pierre = new THREE.Mesh(geometry, material)
            pierre.position.y = positionY + Math.random() * 30 - Math.random() * 30
            pierre.position.z = Math.sin(angle * i) * positionXZ + Math.random() * 40 - Math.random() * 40
            pierre.position.x = Math.cos(angle * i) * positionXZ + Math.random() * 40 - Math.random() * 40

            pierre.rotation.x = Math.random()
            pierre.rotation.y = Math.random()
            pierre.rotation.z = Math.random()
            pierre.castShadow = true
            pierre.receiveShadow = true
            this.mesh.add(pierre)
        }
    }
}
function createStructure() {
    structure = new Structure()
    scene.add(structure.mesh)
}
class Tree {
    constructor() {
        this.mesh = new THREE.Object3D()

        this.tronc()
        this.feuille()

    }
    tronc() {
        const geoTronc = new THREE.CylinderGeometry(4, 4, 10, 5)
        const materialTronc = new THREE.MeshPhongMaterial({ color: color.brown, flatShading: true })

        const tronc = new THREE.Mesh(geoTronc, materialTronc)
        tronc.castShadow = true
        this.mesh.add(tronc)
    }
    feuille() {
        const geoFeuille = new THREE.CylinderGeometry(0, 10, 15, 5)
        const geoFeuille1 = new THREE.CylinderGeometry(0, 9, 15, 5)
        const geoFeuille2 = new THREE.CylinderGeometry(0, 8, 15, 5)
        const materialFeuille = new THREE.MeshPhongMaterial({ color: color.darkGreen, flatShading: true })

        const feuille = new THREE.Mesh(geoFeuille, materialFeuille)
        feuille.castShadow = true
        feuille.receiveShadow = true
        feuille.position.y = 12
        const feuille1 = new THREE.Mesh(geoFeuille1, materialFeuille)
        feuille1.castShadow = true
        feuille1.receiveShadow = true
        feuille1.position.y = 16
        const feuille2 = new THREE.Mesh(geoFeuille2, materialFeuille)
        feuille2.castShadow = true
        feuille2.receiveShadow = true
        feuille2.position.y = 20

        this.mesh.add(feuille,feuille1,feuille2)
    }
}
class Forest{
    constructor(nbTree, largeur){
        this.mesh = new THREE.Object3D()
        let angle = 360/nbTree
        for(let i = 0; i<nbTree; i++){
            let tree = new Tree()
            let x = Math.random()/2 + 0.5
            let largeurRandom = Math.random()*largeur
            let largeurRandom2 = Math.random()*largeur
            tree.mesh.scale.set(x,x,x)
            tree.mesh.position.x = Math.sin(angle*i)*largeurRandom
            tree.mesh.position.z = Math.cos(angle*i)*largeurRandom2
            tree.mesh.castShadow = true

            this.mesh.add(tree.mesh)
        }
    }
}
class Roche{
    constructor(nbRoche){
        this.mesh = new THREE.Object3D()
        const mat = new THREE.MeshPhongMaterial({color: color.lightGrey, flatShading: true})

        for( let i = 0; i < nbRoche; i++){
            let randomRadius = Math.floor(Math.random()*6 + 10)
            const geo = new THREE.DodecahedronGeometry(randomRadius, 0)
            const roche = new THREE.Mesh(geo, mat)
            roche.rotation.x = Math.random()
            roche.rotation.y = Math.random()
            roche.rotation.z = Math.random()

            let positionX = Math.random()*30 - Math.random()*30
            let positionZ = Math.random()*30 - Math.random()*30
            roche.position.x = positionX
            roche.position.y = Math.random()*10
            roche.position.z = positionZ

            roche.castShadow=true
            roche.receiveShadow=true
            this.mesh.add(roche)

        }
    }
}
class Maison{
    constructor(){
        this.mesh = new THREE.Object3D()
        this.sPrincipal()
        this.toit()
        this.cheminer()
    }
    sPrincipal(){
        let positionY = 0
        let positionX = 0
        let positionX2 = -17.5
        let positionZ = -23.5
        const geo1 = new THREE.BoxGeometry(2,4.5,50)
        const material = new THREE.MeshPhongMaterial({color: color.brown})
        let largeurPlanche = 35
        for(let i = 0; i< 8; i++ ){
            const s = new THREE.Mesh(geo1, material)
            const geo2 = new THREE.BoxGeometry(largeurPlanche,4.5,2)
            const s2 = new THREE.Mesh(geo2, material)
            s.position.y = positionY
            s.position.x = positionX
            s2.position.y = positionY
            s2.position.z = positionZ
            s2.position.x = positionX2
            positionY += 4.55
            positionX -= .1
            if(i >= 5){
                largeurPlanche -= 11
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s2)
            }else{
                s.castShadow = true
                s.receiveShadow = true
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s)
                this.mesh.add(s2)
            }
        }
        positionX = -35
        positionY = 0
        positionZ = 23.5
        largeurPlanche = 35
        for(let i = 0; i< 8; i++ ){
            const s = new THREE.Mesh(geo1, material)
           const geo2 = new THREE.BoxGeometry(largeurPlanche,4.5,2)
            const s2 = new THREE.Mesh(geo2, material)
            s.position.y = positionY
            s.position.x = positionX
            s2.position.y = positionY
            s2.position.z = positionZ
            s2.position.x = positionX2
            positionY += 4.55
            positionX += .1
            if(i >= 5){
                largeurPlanche -= 11
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s2)
            }else{
                s.castShadow = true
                s.receiveShadow = true
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s)
                this.mesh.add(s2)
            }
        }
    }
    toit(){
        let positionY = 4*4.5
        let positionX = 5
        let positionZ = 0
        const geo = new THREE.BoxGeometry(2,4.5,50)
        const material = new THREE.MeshPhongMaterial({color: color.brown})
        for(let i = 0; i< 13; i++ ){
            const s = new THREE.Mesh(geo, material)
            s.rotation.z = 1.2
            s.position.y = positionY
            s.position.x = positionX
            s.position.z = positionZ

            positionX -=1.8
            positionY +=1.5
            s.castShadow = true
            s.receiveShadow = true
            this.mesh.add(s)
        }
        positionX = -40
        positionY = 4*4.5
        for(let i = 0; i< 13; i++ ){
            const s = new THREE.Mesh(geo, material)
            s.rotation.z = -1.2
            s.position.y = positionY
            s.position.x = positionX
            s.position.z = positionZ

            positionX +=1.8
            positionY +=1.5
            s.castShadow = true
            s.receiveShadow = true
            this.mesh.add(s)
        }
    }
    cheminer(){
        const geo = new THREE.BoxGeometry(3,5,3)
        const mat = new THREE.MeshPhongMaterial({color: color.grey})

        const cheminer = new THREE.Mesh(geo, mat)
        cheminer.position.y = 35
        cheminer.position.z = -10
        cheminer.position.x = -10
        this.mesh.add(cheminer)

    }
}
class Lac{
    constructor(){
        this.mesh = new THREE.Object3D()


    }
}





// on start
window.addEventListener('load', initialization, false)
