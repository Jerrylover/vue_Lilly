String.prototype.visualLength = function()
{
    var ruler = $("#ruler");
    ruler.html(this);
    return ruler[0].offsetWidth;
}