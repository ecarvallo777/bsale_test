window.onload = async() =>{
    const categoryList = await(await fetch("api/categories")).json();
    console.log(categoryList);
}