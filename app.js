const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    console.log(data.data.news_category)
    const items = data.data.news_category
    items.forEach((item) => {
        console.log(item.category_name)
        const categoryContainer = document.getElementById('category-bar-container')
        const div = document.createElement('div')
        div.innerHTML = `
        
         <button onclick="loadNews('${item.category_id}')" class="btn btn-neutral">${item.category_name}</button>
        `
        categoryContainer.appendChild(div)

    });
}
const loadNews = async (categoryId) => {
    console.log(categoryId)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await res.json()
    // console.log(data.data)
    const items = data.data
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ''
    items.forEach((item) => {
        console.log(item.author.name)

        const div = document.createElement("div");
        div.classList.add("singleNews");
        div.innerHTML = `
    
            <div class="news-photo">
              <img
                src=${item.image_url}
                alt=""
              />
            </div>
            <div class="news-info">
              <div class="news-header">
                <h4>${item.title.slice(0, 20)}</h4>
                <p class="news-badge">
                ${item.rating.badge} <sup> <h6 class="news-rating"> ${item.rating.number
            }</h6></sup>
                </p>
              </div>
              <p>
              ${item.details.slice(0, 200)}
              </p>
    
              <div class="news-footer">
                <div class="author">
                  <div class="">
                    <img
                      class="author-img"
                      src=${item.author.img}
                      alt=""
                    />
                  </div>
                  <div class="author-info">
                    <h6> ${item.author.name}</h6>
                    <p>Date: ${item.author.published_date}</p>
                  </div>
                </div>
                <div class="Views author">
                  <img
                    class="view-img"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/view-icon.png"
                    alt=""
                  />
                  <p>${item.total_view}</p>
                </div>
                
            </div>
          </div>
          `;
        newsContainer.appendChild(div);


    });
}

const handleSearch = () => {
    const value = document.getElementById('search-box').value
    console.log(value)
    if (value) {
        loadNews(value)
    }
    else {
        alert('please enter vaild category id')
    }

}
loadCategory()
loadNews('01')