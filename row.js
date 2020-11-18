class Row{
  
    constructor(){
        this.columns = [];
    }
    
    getColumns(){
        var getCols = '';
        for (let i = 0; i < this.columns.length; i++) {
            getCols += this.columns[i].html;
        }
        return getCols;
    }
    
    getHTML(){
         var html = '<div class="row">'+this.getColumns()+'</div>'
         return html;
    }
  
}