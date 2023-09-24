
let is_mouse_hold: boolean = false;
let changing_column: JQuery;

$(function () {
    $(".task-table-cell__resize").on("mousedown", function (e) {
        is_mouse_hold = true;
        changing_column = $(e.currentTarget.parentElement);
    });

    $(document).on("mouseup", function () {
        if(is_mouse_hold) is_mouse_hold = false, changing_column = undefined;
    })

    $(document).on("mousemove", function (e) {
        if(!is_mouse_hold) return;
        
        let left = changing_column.offset().left;
        let offset = 6; // Смещение вправую сторону, чтобы курсор не оказался за границей столбца.
        let new_width = Math.max(left - e.pageX, e.pageX - left) + offset;

        // Проверка на границу
        if(e.pageX > left + changing_column.width()) {
            if($(".task-table-row_header").offset().left + $(".task-table-row_header").width() >= 
                $(".task-table").offset().left + $(".task-table").width())
                return;
        }
        if(e.pageX < left) return;
        document.documentElement.style.setProperty(`--table-cell-${changing_column.data("name")}`, `${new_width}px`)
    });
});