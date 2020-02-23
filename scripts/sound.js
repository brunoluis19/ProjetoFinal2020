document.addEventListener('DOMContentLoaded', init);
const SOUNDS = {
    'clear-throat':null,
    'doorbell':null,
    'static':null
};
let allowSound = true;
/**
 * 
 */
function init(){
    let p1 = document.querySelector('p[data-file]');
    let p2 = document.querySelector('p:nth-of-type(2)');
    let p3 = document.querySelector('p:last-of-type');
    p1.addEventListener('click', play);
    }
    /**
     * 
     * @param {*} ev 
     */
function play(ev){
    let p = ev.currentTarget;
    ev.preventDefault();
    
    let fn = p.getAttribute('data-file');
    let src = 'media/DBS.mp3';
    if( SOUNDS[fn] ){
        SOUNDS[fn].pause();
        SOUNDS[fn] = null;
    }
    console.log(src);
    let audio = document.createElement('audio');
    audio.src = src;
    audio.volume = 0.2;
    if(allowSound){
        SOUNDS[fn] = audio;
        audio.setAttribute('data-file', fn);
        audio.play();
    }
    /**
    * Procura por audio e video        
    */
    audio.addEventListener('playing', goAudio);
    audio.addEventListener('ended', doneAudio);
}
/**
 * 
 * @param {*} ev 
 */
function goAudio(ev){
    console.log(ev.target.src, 'has started playing');
}
/**
 * 
 * @param {*} ev 
 */
function doneAudio(ev){
    console.log(ev.target.src, 'has finished playing');
    let fn = ev.target.getAttribute('data-file');
    SOUNDS[fn] = null;
}