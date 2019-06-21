/**
 * Created by MOMO on 16/11/11.
 */
;(function () {
    function One() {
        alert(this.a)
    }
    function Two() {
        alert(this.b)
    }
    function Three(o) {
        this.a = o.a;
        this.b = o.b;
        return this;
    }
    Three.prototype.One = One;
    Three.prototype.Two = Two;
    window.Three = Three;
})();