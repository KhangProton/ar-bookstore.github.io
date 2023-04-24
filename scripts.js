// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 1
// Author: Nguyen Dang Duy Khang
// ID: s3979229
// Acknowledgement: Included in the report


function displayBooksByCategory() {
    console.log("haha");
    fetch("src/books.json")
        .then((response) => response.json())
        .then((books) => {
            fetch("src/categories.json")
                .then((response) => response.json())
                .then((categories) => {
                    for (let category in categories) {
                        const bookListWrapper = document.createElement("div");
                        bookListWrapper.className = "book-list-wrapper";

                        const bookList = document.createElement("div");
                        bookList.id = `book-list`;
                        bookList.className = "scrollable";

                        const booksInCategory = books.filter(
                            (book) => book.category === category
                        );

                        if (booksInCategory.length < 6) {
                            const emptyBook = {
                                images: [{ src: "src/bookimages/empty-book.jpg", alt: "" }],
                            };
                            const emptySlots = 6 - booksInCategory.length;
                            for (let i = 0; i < emptySlots; i++) {
                                booksInCategory.push(emptyBook);
                            }
                        }

                        for (let book of booksInCategory) {
                            const bookElement = document.createElement("div");
                            bookElement.className = "book";
                            bookElement.innerHTML = `
                            <img src="${book.images[0].src}" alt="${book.images[0].alt}" onclick="redirectToBookDetailPage('${book.title}')">
                            <a onclick="redirectToBookDetailPage('${book.title}')">${book.title || ""}</a>
                        `;
                            bookList.appendChild(bookElement);
                        }

                        if (bookList.childNodes.length > 0) {
                            const categoryHeader = document.createElement("div");
                            categoryHeader.className = `header-category`;

                            const categoryTitle = document.createElement("a");
                            categoryTitle.textContent = category;
                            categoryTitle.href = `category.html?category=${encodeURIComponent(category.replace(/ /g, "-"))}`;

                            categoryHeader.appendChild(categoryTitle);

                            bookListWrapper.appendChild(bookList);

                            const container = document.querySelector(".container");
                            container.appendChild(categoryHeader);
                            container.appendChild(bookListWrapper);
                        }
                    }
                });
        });
}


function redirectToBookDetailPage(bookTitle) {
    const encodedTitle = encodeURIComponent(bookTitle);
    window.location.href = `bookdetails.html?title=${encodedTitle}`;
}

function redirectToCategoryPage(category) {
    const encodedCategory = encodeURIComponent(category);
    window.location.href = `category.html?category=${encodedCategory}`;
}

function addHorizontalScroll() {
    const scrollable = document.querySelector(".scrollable");
    scrollable.addEventListener("wheel", function (e) {
        if (e.wheelDelta > 0) {
            this.scrollLeft -= 100;
        } else {
            this.scrollLeft += 100;
        }
    });
}

// Load the scripts after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // addBooks();
    displayBooksByCategory();
    // addHorizontalScroll(); <--- Not working, included in the report
});