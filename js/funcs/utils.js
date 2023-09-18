const getUrlParams = key =>{

    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)

}

const addParamToUrl=(param , value)=>{

    let url = new URL(location.href)
    let searchParams = url.searchParams

    searchParams.set(param , value)
    url.search = searchParams.toString()
    location.href = url.toString()

}

const paginateItems = (array , itemsPerPages , paginateParentElement , currentPage) =>{

    paginateParentElement.innerHTML = ''
    let endIndex = itemsPerPages * currentPage
    let startIndex = endIndex - itemsPerPages
    let paginatedItems = array.slice(startIndex , endIndex)
    let paginateCount = Math.ceil(array.length / itemsPerPages )

    var numbers = Array.from({ length: paginateCount }, (_, index) => index + 1);

    console.log('currentPage : ' ,typeof(currentPage));

// نمایش آرایه

      paginateParentElement.insertAdjacentHTML('beforeend' ,`
      
        ${numbers.map(number=>{
            if (number ===Number(currentPage) ) {
                return(
                    `<li class="page-item active">
                        <a class="page-link" onClick="addParamToUrl('page' ,${number})">${number}</a>
                    </li>`
                )
            }else{
                return(
                    `<li class="page-item">
                         <a class="page-link" onClick="addParamToUrl('page' ,${number})">${number}</a>
                     </li>`
                )
            }
           
        }).join('')}`
        )
        
    // }
    return paginatedItems

}


export {getUrlParams , paginateItems , addParamToUrl  }