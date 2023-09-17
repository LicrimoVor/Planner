$(() => {
    const includes = $("[data-include]");
    $.each(includes, function () {
        const file = "/frontend/views/" + $(this).data("include") + ".html";
        $(this).load(file);
    });
});