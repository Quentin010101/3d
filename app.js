import * as THREE from '../three.js/build/three.module.js'
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js'


let height = window.innerHeight
let width = window.innerWidth
const world = document.querySelector('.world')

let scene, camera, renderer, control
let structure, nPic

let color = {
    white:  0xffffff ,
    yellow: 0xF5FA99,
    blue: 0x85dde4,
    lightGrey: 0xc8c8c8,
    grey: 0x9c9c9c,
    darkGrey: 0x5b5b5b,
    brown: 0x733c0b,
    lightGreen: 0xb8eb63,
    darkGreen: 0x72a41f,
}

function createScene() {

    //-------scene
    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(color.lightGrey, 350, 1000)
    //-------camera
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.set(0, 250, 650)
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
    const hemisphereLight = new THREE.HemisphereLight(color.white, color.yellow, 0.6)

    const light = new THREE.DirectionalLight(color.white, 0.7)
    light.position.set(-100, 30, 110)
    light.castShadow = true

    light.shadow.camera.left = -200;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 200;
    light.shadow.camera.bottom = -120;
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
    structure.mesh.rotation.y += 0.001
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

        let largeurSunite = 40
        let sLarge = structureLargeur
        const geoS = new THREE.BoxGeometry(largeurSunite, 10, largeurSunite)
        const matS = new THREE.MeshPhongMaterial({ color: color.lightGreen })
        const matS2 = new THREE.MeshPhongMaterial({ color: color.lightGrey })
        const matS3 = new THREE.MeshPhongMaterial({ color: color.blue, flatShading: true })
        matS3.transparent = true
        matS3.opacity = 0.8
        let nbS = 50
        let angleS = 360 / nbS
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < nbS; i++) {
                const structure = new THREE.Mesh(geoS, matS)
                structure.castShadow = true
                structure.receiveShadow = true

                structure.position.x = Math.sin(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                structure.position.z = Math.cos(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                let px = structure.position.x
                let pz = structure.position.z
                structure.position.y = 40

                if (-px > structureLargeur / 10 && -pz > structureLargeur / 5 && j > 0) {
                    const structure2 = new THREE.Mesh(geoS, matS2)
                    const structure3 = new THREE.Mesh(geoS, matS3)
                    structure2.position.x = Math.sin(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                    structure2.position.z = Math.cos(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                    structure2.position.y = 25
                    structure2.rotation.z = Math.random() * 0.1 - Math.random() * 0.1
                    structure2.rotation.x = Math.random() * 0.1 - Math.random() * 0.1
                    structure2.rotation.y = Math.random() * 0.1 - Math.random() * 0.1
                    structure3.position.x = Math.sin(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                    structure3.position.z = Math.cos(angleS * i) * (sLarge - largeurSunite) + Math.random() * 5
                    structure3.position.y = 35
                    structure3.rotation.z = Math.random() * 0.05 - Math.random() * 0.05
                    structure3.rotation.x = Math.random() * 0.05 - Math.random() * 0.05
                    structure3.rotation.y = Math.random() * 0.05 - Math.random() * 0.05
                    structure2.receiveShadow = true
                    structure3.receiveShadow = true

                    this.mesh.add(structure2)
                    this.mesh.add(structure3)
                } else {
                    structure.rotation.z = Math.random() * 0.1 - Math.random() * 0.1
                    structure.rotation.x = Math.random() * 0.1 - Math.random() * 0.1
                    structure.rotation.y = Math.random() * 0.1 - Math.random() * 0.1

                    this.mesh.add(structure)
                }
            }
            sLarge -= structureLargeur / 5
        }
        this.stone()
        this.littleStone()
        this.ring()
        this.createTree()
        this.createRoche()
        this.createMaison()
        this.createMontagne()
        this.createNuage()
    }
    createNuage(){
        nPic = new THREE.Object3D()
        nPic.scale.set(0.5,0.5,0.5)
        nPic.position.x = 80
        nPic.position.y = 70
        nPic.position.z = -130
    
        let nbNuage = 3
        let anglePic = 2*Math.PI/nbNuage
        for(let i = 0; i< nbNuage; i++){
            let nuage = new Nuage()
            nuage.mesh.position.x = Math.sin(anglePic*i)*100
            nuage.mesh.position.y = 150
            nuage.mesh.position.z = Math.cos(anglePic*i)*100
    
            nuage.mesh.rotation.x = Math.PI*Math.random()
            nuage.mesh.rotation.y = Math.PI*Math.random()
            nuage.mesh.rotation.z = 0.1*Math.random()
    
            nPic.add(nuage.mesh)
        }
        this.mesh.add(nPic)
        function loop(){
            nPic.rotation.y += 0.01
            requestAnimationFrame(loop)
        }
        loop()
    }
    createMontagne() {
        let montagne = new Montagne()
        montagne.mesh.position.y = 60
        montagne.mesh.position.x = 70
        montagne.mesh.position.z = -120

        this.mesh.add(montagne.mesh)
    }
    createMaison() {
        let maison = new Maison()
        maison.mesh.scale.set(0.9, 0.9, 0.9)
        maison.mesh.rotation.y = Math.PI/2
        maison.mesh.position.x = -structureLargeur / 4
        maison.mesh.position.z = structureLargeur / 3.5
        maison.mesh.position.y = 48
        this.mesh.add(maison.mesh)
    }
    createTree() {
        let forest = new Forest(40, 80)
        forest.mesh.position.y = 50
        forest.mesh.position.x = 35
        forest.mesh.position.z = 0
        let forest2 = new Forest(4, 30)
        forest2.mesh.position.y = 50
        forest2.mesh.position.x = -120
        forest2.mesh.position.z = 40
        let forest3 = new Forest(2, 15)
        forest3.mesh.position.y = 50
        forest3.mesh.position.x = -60
        forest3.mesh.position.z = -135
        this.mesh.add(forest.mesh)
        this.mesh.add(forest2.mesh)
        this.mesh.add(forest3.mesh)
    }
    createRoche() {
        function setRoche(object, x, y, z) {
            let name = new Roche(5)
            name.mesh.position.x = x
            name.mesh.position.y = y
            name.mesh.position.z = z
            object.add(name.mesh)
        }
        setRoche(this.mesh, structureLargeur / 2, 50, structureLargeur / 2)
        setRoche(this.mesh, structureLargeur / 1.3, 50, structureLargeur / 3)
        setRoche(this.mesh, -structureLargeur / 2.9, 50, structureLargeur / 1.5)
    }
    stone() {

        const material = new THREE.MeshPhongMaterial({ color: color.darkGrey })
        let hauteurObjet = 10

        let nbLoop = 20
        let positionY = structureHauteur / 2 - hauteurObjet
        let positionXZ = structureLargeur - hauteurObjet
        let nbRocher = 100
        let angle = 360 / nbRocher

        for (let j = 0; j < nbLoop; j++) {
            for (let i = 0; i < nbRocher; i++) {
                let hauteurObjetV = Math.random() * 10 + 10

                const geometry = new THREE.DodecahedronGeometry(hauteurObjetV, 0)
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
        let nbStone = 130
        let hauteurObjet = 8
        let angle = 360 / nbStone

        const geometry = new THREE.DodecahedronGeometry(hauteurObjet, 0)
        const material = new THREE.MeshPhongMaterial({ color: color.grey })
        let positionY = structureHauteur / 2
        let positionXZ = structureLargeur - hauteurObjet

        for (let i = 0; i < nbStone; i++) {
            const pierre = new THREE.Mesh(geometry, material)
            pierre.position.y = positionY + Math.random() * 5 - Math.random() * 35
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

        this.mesh.add(feuille, feuille1, feuille2)
    }
}
class Forest {
    constructor(nbTree, largeur) {
        this.mesh = new THREE.Object3D()
        let angle = 360 / nbTree
        for (let i = 0; i < nbTree; i++) {
            let tree = new Tree()
            let x = Math.random() / 2 + 0.5
            let largeurRandom = Math.random() * largeur
            let largeurRandom2 = Math.random() * largeur
            tree.mesh.scale.set(x, x, x)
            tree.mesh.position.x = Math.sin(angle * i) * largeurRandom
            tree.mesh.position.z = Math.cos(angle * i) * largeurRandom2
            tree.mesh.castShadow = true

            this.mesh.add(tree.mesh)
        }
    }
}
class Roche {
    constructor(nbRoche) {
        this.mesh = new THREE.Object3D()
        const mat = new THREE.MeshPhongMaterial({ color: color.lightGrey, flatShading: true })

        for (let i = 0; i < nbRoche; i++) {
            let randomRadius = Math.floor(Math.random() * 6 + 10)
            const geo = new THREE.DodecahedronGeometry(randomRadius, 0)
            const roche = new THREE.Mesh(geo, mat)
            roche.rotation.x = Math.random()
            roche.rotation.y = Math.random()
            roche.rotation.z = Math.random()

            let positionX = Math.random() * 30 - Math.random() * 30
            let positionZ = Math.random() * 30 - Math.random() * 30
            roche.position.x = positionX
            roche.position.y = - Math.random() * 1
            roche.position.z = positionZ

            roche.castShadow = true
            this.mesh.add(roche)

        }
    }
}
class Maison {
    constructor() {
        this.mesh = new THREE.Object3D()
        this.sPrincipal()
        this.toit()
        this.cheminer()
    }
    sPrincipal() {
        let positionY = 0
        let positionX = 0
        let positionX2 = -17.5
        let positionZ = -23.5
        const geo1 = new THREE.BoxGeometry(2, 4.5, 50)
        const material = new THREE.MeshPhongMaterial({ color: color.brown })
        let largeurPlanche = 35
        for (let i = 0; i < 8; i++) {
            const s = new THREE.Mesh(geo1, material)
            const geo2 = new THREE.BoxGeometry(largeurPlanche, 4.5, 2)
            const s2 = new THREE.Mesh(geo2, material)
            s.position.y = positionY
            s.position.x = positionX
            s2.position.y = positionY
            s2.position.z = positionZ
            s2.position.x = positionX2
            positionY += 4.55
            positionX -= .1
            if (i >= 5) {
                largeurPlanche -= 11
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s2)
            } else {
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
        for (let i = 0; i < 8; i++) {
            const s = new THREE.Mesh(geo1, material)
            const geo2 = new THREE.BoxGeometry(largeurPlanche, 4.5, 2)
            const s2 = new THREE.Mesh(geo2, material)
            s.position.y = positionY
            s.position.x = positionX
            s2.position.y = positionY
            s2.position.z = positionZ
            s2.position.x = positionX2
            positionY += 4.55
            positionX += .1
            if (i >= 5) {
                largeurPlanche -= 11
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s2)
            } else {
                s.castShadow = true
                s.receiveShadow = true
                s2.castShadow = true
                s2.receiveShadow = true
                this.mesh.add(s)
                this.mesh.add(s2)
            }
        }
    }
    toit() {
        let positionY = 4 * 4.5
        let positionX = 5
        let positionZ = 0
        const geo = new THREE.BoxGeometry(2, 4.5, 50)
        const material = new THREE.MeshPhongMaterial({ color: color.brown })
        for (let i = 0; i < 13; i++) {
            const s = new THREE.Mesh(geo, material)
            s.rotation.z = 1.2
            s.position.y = positionY
            s.position.x = positionX
            s.position.z = positionZ

            positionX -= 1.8
            positionY += 1.5
            s.castShadow = true
            s.receiveShadow = true
            this.mesh.add(s)
        }
        positionX = -40
        positionY = 4 * 4.5
        for (let i = 0; i < 13; i++) {
            const s = new THREE.Mesh(geo, material)
            s.rotation.z = -1.2
            s.position.y = positionY
            s.position.x = positionX
            s.position.z = positionZ

            positionX += 1.8
            positionY += 1.5
            s.castShadow = true
            s.receiveShadow = true
            this.mesh.add(s)
        }
    }
    cheminer() {
        const geo = new THREE.BoxGeometry(3, 5, 3)
        const mat = new THREE.MeshPhongMaterial({ color: color.grey })

        const cheminer = new THREE.Mesh(geo, mat)
        cheminer.position.y = 35
        cheminer.position.z = -10
        cheminer.position.x = -10
        this.mesh.add(cheminer)

    }
}
class Montagne {
    constructor() {
        this.mesh = new THREE.Object3D()

        const box = new THREE.BoxGeometry(20,20,20)
        const dode = new THREE.DodecahedronGeometry(20,0)
        const tetra = new THREE.TetrahedronGeometry(20,0)
        const box1 = new THREE.BoxGeometry(15,15,15)
        const dode1 = new THREE.DodecahedronGeometry(15,0)
        const tetra1 = new THREE.TetrahedronGeometry(15,0)
        let arrGeo = [box, dode, tetra]
        let arrGeo1 = [box1, dode1, tetra1]
        const mat1 = new THREE.MeshPhongMaterial({ color: color.lightGreen, flatShading: true })
        const mat2 = new THREE.MeshPhongMaterial({ color: color.brown, flatShading: true })
        const mat3 = new THREE.MeshPhongMaterial({ color: color.grey, flatShading: true })
        const mat4 = new THREE.MeshPhongMaterial({ color: color.white, flatShading: true })


        for (let i = 0; i < 50; i++) {
            let iV = Math.floor(Math.random() * 3)
            const socle = new THREE.Mesh(arrGeo[iV], mat1)
            socle.position.x = Math.random()*60
            socle.position.z = Math.random()*60
            socle.position.y = - 5*Math.random()
            socle.rotation.x = Math.random()*6
            socle.rotation.z = Math.random()*6
            socle.rotation.y = Math.random()*6
            socle.castShadow = true
            socle.receiveShadow = true
            this.mesh.add(socle)
        }
        for (let i = 0; i < 50; i++) {
            let iV = Math.floor(Math.random() * 3)
            const socle = new THREE.Mesh(arrGeo[iV], mat2)
            socle.position.x = Math.random()*50
            socle.position.z = Math.random()*50
            socle.position.y = 20 + 20*Math.random()
            socle.rotation.x = Math.random()*6
            socle.rotation.z = Math.random()*6
            socle.rotation.y = Math.random()*6
            socle.castShadow = true
            socle.receiveShadow = true
            this.mesh.add(socle)
        }
        for (let i = 0; i < 40; i++) {
            let iV = Math.floor(Math.random() * 3)
            const socle = new THREE.Mesh(arrGeo1[iV], mat3)
            socle.position.x = Math.random()*40
            socle.position.z = Math.random()*40
            socle.position.y = 40 + 20*Math.random()
            socle.rotation.x = Math.random()*6
            socle.rotation.z = Math.random()*6
            socle.rotation.y = Math.random()*6
            socle.castShadow = true
            socle.receiveShadow = true
            this.mesh.add(socle)
        }
        for (let i = 0; i < 20; i++) {
            let iV = Math.floor(Math.random() * 3)
            const socle = new THREE.Mesh(arrGeo1[2], mat4)
            socle.position.x = Math.random()*18
            socle.position.z = Math.random()*12
            socle.position.y =  60 + 40*Math.random()
            socle.rotation.x = Math.random()*6
            socle.rotation.z = Math.random()*6
            socle.rotation.y = Math.random()*6
            socle.castShadow = true
            socle.receiveShadow = true
            this.mesh.add(socle)
        }
        for (let i = 0; i < 50; i++) {
            let iV = Math.floor(Math.random() * 3)
            const socle = new THREE.Mesh(arrGeo[iV], mat2)
            socle.position.x = Math.random()*30*2 - Math.random()*30*2
            socle.position.z = Math.random()*30
            socle.position.y = Math.random()
            socle.rotation.x = Math.random()*6
            socle.rotation.z = Math.random()*6
            socle.rotation.y = Math.random()*6
            socle.castShadow = true
            socle.receiveShadow = true
            this.mesh.add(socle)
        }

    }
}
class Nuage {
    constructor(){
        this.mesh = new THREE.Object3D()
        let positionX = 0
        for(let i = 0; i<4; i++){
            const geo = new THREE.DodecahedronGeometry(20,0)
            const mat = new THREE.MeshPhongMaterial({color: color.white})
            mat.transparent = true
            mat.opacity = 0.6

            const nuage = new THREE.Mesh(geo, mat)
            nuage.position.x = positionX
            nuage.position.y = Math.random()*5
            nuage.position.z = Math.random()*5
            nuage.rotation.x = Math.random()*5
            nuage.rotation.y = Math.random()*5
            nuage.rotation.z = Math.random()*5

            this.mesh.add(nuage)
            positionX += Math.random()*30
        }
    }
}






// on start
window.addEventListener('load', initialization, false)
