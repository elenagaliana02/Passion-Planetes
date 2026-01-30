function genererGalerie() {
    document.querySelector('.liste-planetes').innerHTML = '';
    planetes.forEach(function repete(caseplanetes){
        let liensSources = '';
        caseplanetes.sources.forEach(function(src) {
            liensSources += '<a href="'+src.url+'" target="_blank">'+src.credit+'</a> ';
        });
        document.querySelector('.liste-planetes').innerHTML += 
            '<figure class="planete">'+
            '<img class="image-cliquable" src="'+caseplanetes.imageSmall+'" alt="'+caseplanetes.nom+'">'+
            '<figcaption>'+
                '<h3>'+caseplanetes.nom+'</h3>'+
                '<p>'+caseplanetes.description+'</p>'+
                '<p><strong>Ma passion :</strong> '+caseplanetes.passion+'</p>'+
                '<p><em>Sources :</em> '+liensSources+'</p>'+
            '</figcaption>'+
            '</figure>';
    });
    attacherZoom();
}

function attacherZoom() {
    let imagesCliquables = document.querySelectorAll(".image-cliquable");
    let popup = document.querySelector(".popup");
    let fermerFenetre = document.querySelector(".cache-fenetre");
    let imageZoom = document.querySelector(".image-zoom");
    let titreZoom = document.querySelector(".titre-zoom");

    imagesCliquables.forEach(function(image) {
        image.style.cursor = "pointer";
        image.addEventListener("click", function(e) {
            e.stopPropagation();
            imageZoom.src = image.src;
            titreZoom.textContent = image.alt;
            popup.classList.remove("popup-invisible");
            popup.classList.add("popup-visible");
        });
    });

    fermerFenetre.onclick = function() {
        popup.classList.remove("popup-visible");
        popup.classList.add("popup-invisible");
    };
    document.querySelector(".fermer-popup").onclick = function() {
        popup.classList.remove("popup-visible");
        popup.classList.add("popup-invisible");
    };
}

document.addEventListener("DOMContentLoaded", function() {
    genererGalerie(); 
    
    
    let formContrib = document.getElementById('formContrib');
    let zonePreview = document.getElementById('zonePreview');
    
    formContrib.addEventListener('submit', function(e) {
        e.preventDefault();
        let url = document.getElementById('urlImage').value;
        let texte = document.getElementById('texteImage').value;
        
        zonePreview.innerHTML = `
            <div style="background:#2a2a2a;padding:20px;border-radius:10px;">
                <h4 style="color:rgb(125,195,255);">Prévisualisation</h4>
                <img src="${url}" style="width:250px;height:180px;object-fit:cover;border-radius:8px;">
                <p>${texte}</p>
                <br>
                <button onclick="ajouterPlanete('${url}', '${texte}')" style="background:#28a745;color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;">Ajouter</button>
                <button onclick="zonePreview.innerHTML='';zonePreview.style.display='none'" style="background:#dc3545;color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;margin-left:10px;">Annuler</button>
            </div>
        `;
        zonePreview.style.display = 'block';
        formContrib.reset();
    });
});


function ajouterPlanete(url, texte) {
    let nouvelle = {
        nom: "Contribution",
        description: texte,
        passion: "Visiteur passionné",
        imageSmall: url,
        imageLarge: url,
        sources: [{url: url, credit: "Contributeur"}]
    };
    planetes.push(nouvelle);
    document.getElementById('zonePreview').style.display = 'none';
    genererGalerie();
    alert('✅ Contribution ajoutée !');
}