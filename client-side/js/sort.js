async function selectionChange(sort){
    const category = document.getElementById("category");


    const productsSort = await(await fetch("api/sort/"+sort+"/"+category.name+"")).json();
    addProducts(productsSort);


}