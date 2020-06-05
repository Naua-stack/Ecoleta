function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
   .then( res=> res.json ()  )
   .then( states => {
       for( const state of states){
       ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
       }
   })
}





populateUFs()


function getCities(event){

  const citiesSelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufvalue = event.target.value
  const indexofSelectedstate = event.target.selectedIndex
  stateInput.value = event.target.options[indexofSelectedstate].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
  citiesSelect.innerHTML = "<option value > Selecione a cidade</option"
  citiesSelect.disabled = true
  fetch(url)
   .then( res=> res.json ()  )
   .then( cities => {
    
       for( const city of cities){
       citiesSelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
       }
   })
   citiesSelect.disabled = false
}


document
.querySelector("select[name=uf]") 
.addEventListener("change", getCities);


const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}
const collecteditems = document.querySelector("input[name=items]")
let selectedItems = []
function handleSelectedItem(event){
    const itemLi = event.target
   
   
    itemLi.classList.toggle("selected")
   
   
    const  itemId = itemLi.dataset.id

    //console.log('ITEM ID:', itemId)
    
    
    const alreadyselected = selectedItems.findIndex( item => {
           const itemFound = item == itemId
           return itemFound
    })

   
    if(alreadyselected >= 0){
      const filteradditems = selectedItems.filter( item =>{
        const itemisdiferent = item != itemId
        return itemisdiferent
      })
       selectedItems = filteradditems
    }else{
      selectedItems.push(itemId)
    }

   // console.log('selectedItems:', selectedItems)
 
   collecteditems.value = selectedItems
}


