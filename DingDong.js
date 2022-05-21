'use strict';

class DingDong {

#vertices;
#indices;

    constructor(r = 1, rr = 2, scale = 2, sphere_div = 100) {
        this.r = r;
        this.rr = rr;
        this.sphere_div = sphere_div;
        this.scale = scale;
        this.#vertices = [];
        this.#indices = [];
    }

    #calc_vertices() {
        this.#vertices = [];
        var ai, aj, tmp, si, ci;
        for (let j = -this.sphere_div; j <= this.sphere_div; j++) {
            tmp = j / this.sphere_div;
            aj = tmp * Math.sqrt(1 - tmp) * this.r;
            for (let i = 0; i <= this.sphere_div; i++) {
                ai = i * 2 * Math.PI / this.sphere_div * this.rr;
                si = Math.sin(ai);
                ci = Math.cos(ai);
                this.#vertices.push(aj * ci * this.scale);
                this.#vertices.push(aj * si * this.scale);
                this.#vertices.push(tmp * this.scale);
            }
        }
    }

    get vertices() {
        this.#calc_vertices();
        return this.#vertices;
    }

    #calc_indices() {
        this.#indices = [];
        let p1, p2;
        for (let j = 0; j < 2 * this.sphere_div; j++) {
            for (let i = 0; i < this.sphere_div; i++) {
                p1 = j * (this.sphere_div + 1) + i;
                p2 = p1 + (this.sphere_div + 1);

                //   this.#indices.push(p1, p2, p1 + 1);

                //   this.#indices.push(p1 + 1, p2, p2 + 1);
                this.#indices.push(p1);
                this.#indices.push(p2);
                this.#indices.push(p1 + 1);

                this.#indices.push(p1 + 1);
                this.#indices.push(p2);
                this.#indices.push(p2 + 1);
            }
        }
    }

    get indices() {
        this.#calc_indices();
        return this.#indices;
    }
};