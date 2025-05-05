fetch(`https://hearty-strength.up.railway.app/api/blogs`)
  .then(res => res.json())
  .then(blogs => {
    const container = document.getElementById("blog-container");

    // Clear the container before adding new blogs
    container.innerHTML = '';

    if (blogs.length === 0) {
      const noBlogsMessage = document.createElement("p");
      noBlogsMessage.className = "text-center text-gray-600 text-lg";
      noBlogsMessage.textContent = "No blogs available.";
      container.appendChild(noBlogsMessage);
    } else {
      blogs.forEach(blog => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer";

        card.innerHTML = `
          <a href="blog-details.html?id=${blog._id}">
            <img src="${blog.image}" 
                 onerror="this.onerror=null;this.src='https://via.placeholder.com/400x250';" 
                 class="w-full h-48 object-cover" 
                 alt="Blog image">
            <div class="p-4">
              <h2 class="text-xl font-bold text-gray-900">${blog.title}</h2>
              <p class="text-gray-600 text-sm">${blog.content.substring(0, 150)}...</p>
            </div>
          </a>
        `;

        container.appendChild(card);
      });
    }
  })
  .catch(err => {
    console.error("❌ Failed to fetch blogs:", err);
  });
