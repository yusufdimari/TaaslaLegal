import React from "react";

export default function Admin(){
  return(
<html>
  <body>
    <section class="boxes">
      <div class="container">
        <div class="box">
          <h2><i class="fas fa-arrows-alt-v"></i> Requested</h2>
          <p>
          <a href="#">BUSINESS NAME REGISTRATION</a>
          </p>
        </div>

        <div class="box">
          <h2><i class="fa fa-folder-open"></i>Requested</h2>
          <p>  
          <a href="#">COMPANY NAME REGISTRATION</a>
          </p>
        </div>

        <div class="box">
          <h2><i class='far fa-list-alt'></i>Requested</h2>
          <p>
            <a href="#">INCORPORATED TRUSTEE</a>
          </p>
        </div>

        <div class="box">
          <h2><i class="fa fa-gears"></i>Requested</h2>
          <p>
            <a href="#">LEGAL DOCUMENTS GENERATION</a>
          </p>
        </div>
      </div>
    </section>

  </body>
</html>
  )
}