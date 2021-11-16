export default {
    pageSize: 'LEGAL',
    pageOrientation: 'landscape',
    pageMargins: [15, 125, 15, 15],
    header: {
      stack: [
        {
          text: 'METALS INDUSTRY RESEARCH AND DEVELOPMENT CENTER',
          style: 'header',
          fontSize: 11
        },
        {
          text: 'Overall Agency Citizen/ Client Satisfaction Score'.toUpperCase(),
          style: 'header',
          fontSize: 13
        },
        {
          text: 'CUSTOMER SATISFACTION MEASUREMENT RESULTS',
          style: 'header',
          fontSize: 13,
          decoration: 'underline'
        },
        // {
        //   text: '',
        //   style: 'header',
        //   fontSize: 11,
        //   decoration: 'underline'
        // },
        // {
        //   text:
        //     'FOR WHICH ROBERT O DIZON, EXECUTIVE DIRECTOR, IS ACCOUNTABLE, HAVING ASSUMED SUCH ACCOUNTABILITY ON JANUARY 2016',
        //   style: 'header',
        //   bold: false,
        //   fontSize: 11
        // }
      ],
      margin: [34, 28.91, 34, 21.54]
    },
    content: [
      {
        table: {
          headerRows: 0,
          widths: [100, 180, 80, 40, 80, '*', '*', '*', '*', '*', 100],
          body: [
            [
              // {
              //   text: 'No.',
              //   style: 'tableHeader',
              //   rowSpan: 2
              // },
              {
                text: 'ARTICLE',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'DESCRIPTION',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'PROPERTY NUMBER',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'UNIT',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'UNIT VALUE',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'QTY. PER PROPERTY',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'QTY. PER PHYSICAL COUNT',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'SHORTAGE/OVERAGE',
                style: 'tableHeader',
                colSpan: 2
              },
              {
                text: ''
              },
              {
                text: 'DATE ACQUIRED',
                style: 'tableHeader',
                rowSpan: 2
              },
              {
                text: 'REMARKS',
                style: 'tableHeader',
                rowSpan: 2
              }
            ]
          ]
        }
      }
    ],
    styles: {
      header: {
        alignment: 'center',
        bold: true
      },
      tableHeader: {
        fontSize: 11,
        alignment: 'center'
      }
    },
    defaultStyle: {
      fontSize: 10
    }
  }
  