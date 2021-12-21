////////////////////////////////////////////////////////////////////////////////
// illumination.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Illumination".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:
// Gruppe     :
// Autor 1    :
// Autor 2    :
// Autor 3    :
// Autor 4    :
// Autor 5    :
////////////////////////////////////////////////////////////////////////////////



// das ambiente Licht
let ambientLight = {intensity: {r: 0.125, g: 0.125, b: 0.125}};

// alle übrigen (Punkt)-Lichter der Szene
let lights = [
  {position: new THREE.Vector3(-100, 100, 75),
   intensity: {r: 0.875, g: 0.625, b: 0.125}},
];



////////////////////////////////////////////////////////////////////////////////
// initScene()
// Initialisierung.
// Wird automatisch beim Start aufgerufen.
////////////////////////////////////////////////////////////////////////////////
function initScene()
{
  registerLights(lights);
}



////////////////////////////////////////////////////////////////////////////////
// phong(position, normal, camPosition)
// Wird während des Renderings für jeden Vertex einmal aufgerufen.
// Parameter: position     Vertexposition (Vector3)
//            normal       Vertexnormale (Vector3)
//            camPosition  Kameraposition (Vector3)
// Rueckgabe: Eine Farbe. D.h. ein Objekt mit den Attributen .r, .g und .b
//
// Hinweis: Alle Parameter befinden sich im selben Koordinatensystem.
////////////////////////////////////////////////////////////////////////////////
function phong(position, normal, camPosition)
{
  // Initialisiere den Rueckgabewert
  let outColor = {r: 0.0, g: 0.0, b: 0.0};

  // TODO: Implementieren Sie die Beleuchtungsberechnung
  //       mit dem Phong-Beleuchtungsmodell.
  let ka = {r: 1.0, g: 1.0, b: 1.0};
  let kd = {r: 1.0, g: 1.0, b: 1.0};
  let ks = {r: 1.0, g: 1.0, b: 1.0};

  let i = 0;
  //for (let i = 0; i >= lights.length; i++)
  //{
    let L = new THREE.Vector3();
    L.subVectors(lights[i].position, position);
    L.normalize();
    normal.normalize();
    let NL = L.dot(normal);

    let R = new THREE.Vector3();
    R = normal.multiplyScalar(2 * NL);
    R.subVectors(R, L);

    let V = new THREE.Vector3();
    V.subVectors(camPosition, position);

    if (NL < 0) NL = 0;

    let VR = Math.pow(R.dot(V), 20);

    outColor.r = ambientLight.intensity.r * ka.r;
    outColor.g = ambientLight.intensity.g * ka.g;
    outColor.b = ambientLight.intensity.b * ka.b;




    outColor.r += lights[i].intensity.r * (kd.r * NL);
    outColor.g += lights[i].intensity.g * (kd.g * NL);
    outColor.b += lights[i].intensity.b * (kd.b * NL);

    outColor.r += lights[i].intensity.r * (ks.r * VR);
    outColor.g += lights[i].intensity.g * (ks.g * VR);
    outColor.b += lights[i].intensity.b * (ks.b * VR);
  //}


  // Rueckgabe des berechneten Farbwerts
  return outColor;
}
