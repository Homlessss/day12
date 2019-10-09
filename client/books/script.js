let page = 0;

$(document).ready(function () {
    $.ajax(`${ROOT_API}/book`, {
        type: "GET",
        success: function (data) {
            if (data && data.data) {
                $("#book-list").html("");
                $("#book-list").append(`
                    <div class="col-12 mt-3 mb-3">
                        <div class="row">
                            <div class="col-3">
                                <img class="image-placeholder" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg"></img>
                            </div>
                            <div class="col-9">
                                <h3 class="text-success">${data.data[i].title}</h3>
                                <h4>${data.data[i].category}</h4>
                                <h4>${data.data[i].description}</h4>
                                <h4>${data.data[i].author}</h4>
                            </div>
                        </div>
                    </div>
                `);

                $("#pagination-list").html("");
                for (let i = 1; i <= Math.ceil(data.total / NUMBER_OF_USER); i++) {
                    $("#pagination-list").append(`
                        <li class="page-item" onclick="loadPage(${i})">
                            <a class="page-link" href="#">
                                ${i}
                            </a>
                        </li>
                    `);
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
});

function loadPage(pageNumber) {
    $.ajax(`${ROOT_API}/book?skip=${(pageNumber - 1) * NUMBER_OF_USER}&limit=${NUMBER_OF_USER}`, {
        type: "GET",
        success: function (data) {
            if (data && data.data) {
                $("#book-list").html("");
                $("#book-list").append(`
                    <div class="col-12 mt-3 mb-3">
                        <div class="row">
                            <div class="col-3">
                                <img class="image-placeholder" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg"></img>
                            </div>
                            <div class="col-9">
                                <h3 class="text-success">${data.data[i].title}</h3>
                                <h4>${data.data[i].category}</h4>
                                <h4>${data.data[i].description}</h4>
                                <h4>${data.data[i].author}</h4>
                            </div>
                        </div>
                    </div>
                `);

                $("#pagination-list").html("");
                for (let i = 1; i <= Math.ceil(data.total / NUMBER_OF_USER); i++) {
                    $("#pagination-list").append(`
                        <li class="page-item" onclick="loadPage(${i})">
                            <a class="page-link" href="#">
                                ${i}
                            </a>
                        </li>
                    `
                    );
                
                page = pageNumber;
                $("#page-previous").click(loadPage(page-1));
                $("#page-next").click(loadPage(page+1));
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}