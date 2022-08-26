
module.exports = (data) => {
 
    const today = new Date();
    
    return `
    
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
          color: #333;
          padding: 20px;

        }
  
       
  
        table {
           width: 100%;           
           text-align: center;
        }
  
        thead {
          display: table-header-group;
        }
  
      </style>
    </head>
    <body> 
   


        <table>
          ${data.map((d) => {
        return (
            `<tr>
                    <td>${d.legajo}</td>
                    <td>${d.name}</td>
                    <td>${d.credential}</td>
                    <td>${d.fvec}</td>
                    <td>${d.state}</td>
                </tr>`
        )
    })}
        </table>  
    </body>
  </html>
    `;
};