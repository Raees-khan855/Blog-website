    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (!query) return;

        try {
          const res = await fetch(`https://hearty-strength.up.railway.app/api/search?query=${encodeURIComponent(query)}`);
          const data = await res.json();

          if (data.success) {
            const blogs = data.blogs;

    searchResults.innerHTML = blogs.length > 0
      ? blogs.map(blog => `
          <div class="bg-white p-4 my-2 shadow rounded flex items-start gap-4">
            <img src="${blog.image}" alt="${blog.title}" class="w-32 h-24 object-cover rounded-md" />
            <div>
              <h2 class="text-xl font-semibold">${blog.title}</h2>
              <p class="text-sm text-gray-600">${blog.content?.slice(0, 100) || ''}...</p>
              <a href="blog-details.html?id=${blog._id}" class="text-blue-500 hover:underline">Read more</a>
            </div>
          </div>
        `).join('')
      : `<p class="text-gray-600">No blogs found for "${query}"</p>`;
          } else {
            searchResults.innerHTML = `<p class="text-red-500">Error: ${data.message}</p>`;
          }

        } catch (err) {
          console.error("Search error:", err);
          searchResults.innerHTML = `<p class="text-red-500">Search failed. Try again later.</p>`;
        }
      }
    });