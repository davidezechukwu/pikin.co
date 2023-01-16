$(document).ready(function() {
    $(document).on("keydown", ".pk-number .pk-form", function(e) {
        if (this.value.length > 1) {
            this.value = String.fromCharCode(e.keyCode);
        }
    });
    $(document).on("keyup", ".pk-number .pk-form", function(e) {
        if (this.value.length > 1) {
            this.value = String.fromCharCode(e.keyCode);
        }
    });
});