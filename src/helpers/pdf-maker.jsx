export function PDFMaker(head,content){

    let style = "<style>";
    style += "</style>";

    let header = head;
    let body = content;
    let theBody = header + body;

    let newWin = window.open("","","height=700,width=700");

    newWin.document.write(style);
    newWin.document.write(theBody);
    newWin.print();
    newWin.close();

}