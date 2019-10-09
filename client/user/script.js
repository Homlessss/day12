let skip = 0;

$(document).ready(function() {
  $.ajax(`${ROOT_API}/user`, {
    type: "GET",
    success: function(data) {
      if (data && data.data) {
        // Xu li data
        for (let i = 0; i < data.data.length; i++) {
          let books = "";
          if (data.data[i].books) {
            for (let j = 0; j < data.data[i].books.length; j++) {
              books += data.data[i].books[j].title;
            }
          }
          $("#user-list").append(`
            <div class="col-12 mt-3 mb-3">
              <div class="row">
                <div class="col-3">
                  <img class="image-placeholder" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg"></img>
                </div>
                <div class="col-9">
                  <h3 class="text-success">${data.data[i].name}</h3>
                  <h4>${data.data[i].email}</h4>
                  <h4>${data.data[i].phone || ""}</h4>
                  <h4 class="text-danger">${books}</h4>
                </div>
              </div>
            </div>
          `)
        }

        // Xu li total
        for ( let i = 1; i <= Math.ceil(data.total / NUMBER_OF_USER); i++) {
          $("#pagination-list").append(`
            <li class="page-item" onclick="loadPage(${i})">
              <a class="page-link" href="#">${i}
              </a>
            </li>
          `)
        }
      } else {
        //
      }
    },
    error: function(err) {
      console.log(err);
    }
  })
})

function loadPage(pageNumber) {
  $.ajax(`${ROOT_API}/user?skip=${(pageNumber - 1) * 10}&limit=${NUMBER_OF_USER}`, {
    type: "GET",
    success: function(data) {
      if (data && data.data) {
        // Xu li data
        $("#user-list").html("");
        for (let i = 0; i < data.data.length; i++) {
          let books = "";
          if (data.data[i].books) {
            for (let j = 0; j < data.data[i].books.length; j++) {
              books += data.data[i].books[j].title;
            }
          }
          $("#user-list").append(`
            <div class="col-12 mt-3 mb-3">
              <div class="row">
                <div class="col-3">
                  <img class="image-placeholder" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg"></img>
                </div>
                <div class="col-9">
                  <h3 class="text-success">${data.data[i].name}</h3>
                  <h4>${data.data[i].email}</h4>
                  <h4>${data.data[i].phone || ""}</h4>
                  <h4 class="text-danger">${books}</h4>
                </div>
              </div>
            </div>
          `)
        }

        // Xu li total
        $("#pagination-list").html("");
        for ( let i = 1; i <= Math.ceil(data.total / NUMBER_OF_USER); i++) {
          $("#pagination-list").append(`
            <li class="page-item" onclick="loadPage(${i})">
              <a class="page-link" href="#">${i}
              </a>
            </li>
          `)
        }
      } else {
        //
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}