const filePath = "assets/json/data.json";

const jobs = [];
const productsJobs = document.querySelector(".cart-container")

async function getJobs(){
    try{
      productsJobs.innerHTML = `<i id="loading" class="fa-solid fa-spinner fa-spin"></i>`;
      const response = await fetch(filePath);
      if(!response.ok){
        throw new Error("Veri alınamadı.");
      }
      const data = await response.json();
      jobs.push(...data);
      renderJobs();
    }
    catch(error){
      console.log(error);
    }
  }
  function renderJobs(){
    productsJobs.innerHTML = "";
    jobs.forEach(job => {
        productsJobs.innerHTML +=  `
            <div class="main-container">
                <img src="${job.logo}" alt="${job.company}">
                <div class="content-container">
        
                    <div class="info-content">
                        <p>${job.postedAt}</p>
                        <div class="oval">
                        </div>
                        <p>${job.contract}</p>
                    </div>
                    <div class="title">
                        <p>${job.position}</p>
                    </div>
                    <div class="back-title">
                        <p>${job.company}</p>
                    </div>
                    <div class="country">
                        <p>${job.location}</p>
                    </div>
                </div>
            </div>
        `
    });
}

getJobs();