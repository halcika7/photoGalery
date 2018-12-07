class LightBox{
    constructor(){
        this.initialize();
    }
    initialize() {
        let picturesContainer = document.querySelectorAll('.pictures'),
            closeModal = document.querySelector('.close-modal > .fa-times'),
            lightbox = document.querySelector('.light-box-modal'),
            arrows = document.querySelectorAll('.arrow i'),
            bigImg = document.querySelector('.main-img > .img img'),
            imgLengt = document.querySelector('.img-length'),
            imgActive = document.querySelector('.img-active'),
            imgAlt = document.querySelector('.img-alt'),
            brojac = 0, position = 0, length = 0,arr = [];

        picturesContainer.forEach( element => {
          arr.push(this.generateLightBox(element));
        });

        let showElements = () => {
            bigImg.classList.toggle('show');
            imgAlt.classList.toggle('show'); 
            imgActive.classList.toggle('show');
            imgLengt.classList.toggle('show');
        }

        let setSrc = (i,index,last) => {
            showElements();
            bigImg.src = arr[index].src[i];
            if(typeof arr[index].alt[i] == 'undefined'){
                arr[index].alt[i] = " ";
            }
            bigImg.alt = arr[index].alt[i];
            setTimeout( () => { 
                showElements();
                imgActive.innerText = i+1 + ' / '; 
                imgAlt.innerText = arr[index].alt[i];
                imgLengt.innerText = last; 
            },300);
            brojac = i;
            length = last;
            position=index;
        }

        let picturesClick = () => {
            arr.forEach( (element,index) => {
                for(let i = 0; i < element.pic.length;i++){
                    element.pic[i].addEventListener('click', e => {
                        setTimeout( () => { 
                            lightbox.classList.add('open');
                        },300); 
                        setSrc(i,index,element.pic.length); 
                    });
                }
            });
        }

        let checkArrow = (element,i,index) => {
            if(element == "ArrowLeft" && i == 0){ i = arr[index].pic.length -1; }
            else if(element == "ArrowLeft" && i != 0){ i--; }
            else if(element == "ArrowRight" && i == arr[index].pic.length -1){ i = 0; }
            else if(element == "ArrowRight" && i != arr[index].pic.length -1){ i++; }
            setSrc(i,index,arr[index].pic.length);          
        }

        let arrowsForEach = () => {
            arrows.forEach( element => {
                element.addEventListener('click', e => {
                    element.classList.contains('fa-arrow-left') ? checkArrow("ArrowLeft",brojac,position) : checkArrow("ArrowRight",brojac,position);
                });
            });
        }

        let keyDownListeners = () => {
            document.addEventListener('keydown', function(event) {
                if(event.code == "ArrowLeft"){ checkArrow(event.code,brojac,position); }
                if(event.code == "ArrowRight"){ checkArrow(event.code,brojac,position); }
            });
        }

        let closeModalFunction = () => {
            closeModal.addEventListener('click', e => {  
                lightbox.classList.remove('open');
            });
        }

        arrowsForEach();
        keyDownListeners();
        closeModalFunction();
        picturesClick();
    }
    generateLightBox(el){
        let pictures = [...el.getElementsByTagName('img')];
        let picSrc = [];
        let picAlt = [];
        let obj = {};
        let fillSrc = () => {
            pictures.forEach(element => { 
                picSrc.push(element.src);
                if(element.alt){ 
                    picAlt.push(element.alt);
                } 
            });
            obj = {src:picSrc, alt:picAlt, pic:pictures};
        }
        fillSrc();
        return obj;
    }
}