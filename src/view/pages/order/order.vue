<template>
  <div>
    <svg class="d-none" xmlns="http://www.w3.org/2000/svg">
      <symbol id="check2" viewBox="0 0 16 16">
        <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </symbol>
      <symbol id="circle-half" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
      </symbol>
      <symbol id="moon-stars-fill" viewBox="0 0 16 16">
        <path
            d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        <path
            d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
      </symbol>
      <symbol id="sun-fill" viewBox="0 0 16 16">
        <path
            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
      </symbol>
    </svg>

    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
      <button id="bd-theme"
              aria-expanded="false"
              aria-label="Toggle theme (auto)"
              class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
              type="button">
        <svg class="bi my-1 theme-icon-active" height="1em" width="1em">
          <use href="#circle-half"></use>
        </svg>
        <span id="bd-theme-text" class="visually-hidden">Toggle theme</span>
      </button>
      <ul aria-labelledby="bd-theme-text" class="dropdown-menu dropdown-menu-end shadow">
        <li>
          <button aria-pressed="false" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
                  type="button">
            <svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
              <use href="#sun-fill"></use>
            </svg>
            Light
            <svg class="bi ms-auto d-none" height="1em" width="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
        <li>
          <button aria-pressed="false" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
                  type="button">
            <svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
              <use href="#moon-stars-fill"></use>
            </svg>
            Dark
            <svg class="bi ms-auto d-none" height="1em" width="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
        <li>
          <button aria-pressed="true" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
                  type="button">
            <svg class="bi me-2 opacity-50 theme-icon" height="1em" width="1em">
              <use href="#circle-half"></use>
            </svg>
            Auto
            <svg class="bi ms-auto d-none" height="1em" width="1em">
              <use href="#check2"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>


    <svg class="d-none" xmlns="http://www.w3.org/2000/svg">
      <symbol id="check" viewBox="0 0 16 16">
        <title>Check</title>
        <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </symbol>
    </svg>

    <div class="container py-3">
      <header>
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a class="d-flex align-items-center link-body-emphasis text-decoration-none" href="/">
            <svg class="me-2" height="32" role="img" viewBox="0 0 118 94" width="40" xmlns="http://www.w3.org/2000/svg">
              <title>Bootstrap</title>
              <path clip-rule="evenodd"
                    d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
                    fill="currentColor" fill-rule="evenodd"></path>
            </svg>
            <span class="fs-4">Pricing example</span>
          </a>

          <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <a class="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Features</a>
            <a class="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Enterprise</a>
            <a class="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Support</a>
            <a class="py-2 link-body-emphasis text-decoration-none" href="#">Pricing</a>
          </nav>
        </div>

        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal text-body-emphasis">Pricing</h1>
          <p class="fs-5 text-body-secondary">Quickly build an effective pricing table for your potential customers with
            this Bootstrap example. It’s built with default Bootstrap components and utilities with little
            customization.</p>
        </div>
      </header>

      <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h4 class="my-0 fw-normal">Free</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">$0<small class="text-body-secondary fw-light">/mo</small></h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>10 users included</li>
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                <button class="w-100 btn btn-lg btn-outline-primary" type="button">Sign up for free</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h4 class="my-0 fw-normal">Pro</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">$15<small class="text-body-secondary fw-light">/mo</small>
                </h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>20 users included</li>
                  <li>10 GB of storage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <button class="w-100 btn btn-lg btn-primary" type="button">Get started</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm border-primary">
              <div class="card-header py-3 text-bg-primary border-primary">
                <h4 class="my-0 fw-normal">Enterprise</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">$29<small class="text-body-secondary fw-light">/mo</small>
                </h1>
                <ul class="list-unstyled mt-3 mb-4">
                  <li>30 users included</li>
                  <li>15 GB of storage</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
                <button class="w-100 btn btn-lg btn-primary" type="button">Contact us</button>
              </div>
            </div>
          </div>
        </div>

        <h2 class="display-6 text-center mb-4">Compare plans</h2>

        <div class="table-responsive">
          <table class="table text-center">
            <thead>
            <tr>
              <th style="width: 34%;"></th>
              <th style="width: 22%;">Free</th>
              <th style="width: 22%;">Pro</th>
              <th style="width: 22%;">Enterprise</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th class="text-start" scope="row">Public</th>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            <tr>
              <th class="text-start" scope="row">Private</th>
              <td></td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            </tbody>

            <tbody>
            <tr>
              <th class="text-start" scope="row">Permissions</th>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            <tr>
              <th class="text-start" scope="row">Sharing</th>
              <td></td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            <tr>
              <th class="text-start" scope="row">Unlimited members</th>
              <td></td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            <tr>
              <th class="text-start" scope="row">Extra security</th>
              <td></td>
              <td></td>
              <td>
                <svg class="bi" height="24" width="24">
                  <use xlink:href="#check"/>
                </svg>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
          <div class="col-12 col-md">
            <!--<img class="mb-2" src="../assets/brand/bootstrap-logo.svg" alt="" width="24" height="19">-->
            <small class="d-block mb-3 text-body-secondary">&copy; 2017–2023</small>
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Cool stuff</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Random feature</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Team feature</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Stuff for developers</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Another one</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Last time</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Resource</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Resource name</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Another resource</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Final resource</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Team</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Locations</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Privacy</a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

</script>

<style scoped src="bootstrap/dist/css/bootstrap.min.css">
.bi {
  vertical-align: -.125em;
  fill: currentColor;
}


.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}
</style>
