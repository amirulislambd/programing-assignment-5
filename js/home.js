
document.getElementById('buttons').addEventListener('click',(e)=>{
    const target = e.target
    if(target.classList.contains('btn')){
      const allButtons= document.querySelectorAll('#buttons .btn')
    allButtons.forEach(btn =>btn.classList.remove('btn-primary'))
    target.classList.add('btn-primary')
}
})
addEventListener