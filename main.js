(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../provenance-slide-deck/dist/provenance-slide-deck.es5.js":
/*!******************************************************************!*\
  !*** ../provenance-slide-deck/dist/provenance-slide-deck.es5.js ***!
  \******************************************************************/
/*! exports provided: ProvenanceSlidedeck, ProvenanceSlide, ProvenanceSlidedeckVisualization, ProvenanceSlidePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidedeck", function() { return ProvenanceSlidedeck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlide", function() { return ProvenanceSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidedeckVisualization", function() { return ProvenanceSlidedeckVisualization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidePlayer", function() { return ProvenanceSlidePlayer; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "../node_modules/d3/index.js");


/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  https://github.com/developit/mitt
 *  commit: 820ac6a172efbbd472e0a802ffad6a882f0cbb27
 *  MIT Licence
 *    Copyright 2018 Jason Miller
 *    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *  @name mitt
 *  @author Jason Miller
 *  @returns {Mitt}
 */
function mitt(all) {
    all = all || Object.create(null);
    return {
        /**
         * Register an event handler for the given type.
         *
         * @param  {String} type	Type of event to listen for
         * @param  {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on(type, handler) {
            (all[type] || (all[type] = [])).push(handler);
        },
        /**
         * Remove an event handler for the given type.
         *
         * @param  {String} type	Type of event to unregister `handler` from
         * @param  {Function} handler Handler function to remove
         * @memberOf mitt
         */
        off(type, handler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        /**
         * Invoke all handlers for the given type.
         *
         * @param {String} type  The event type to invoke
         * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit(type, evt) {
            (all[type] || []).slice().map((handler) => {
                handler(evt);
            });
        }
    };
}

function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' &&
        typeof performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = ((d + Math.random() * 16) % 16) | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
/**
 * Generate a Unix timestamp in milliseconds
 *
 * @returns {number} in milliseconds
 */
function generateTimestamp() {
    // Removed, because performance.now() returns a floating point number, which is not compatible with the Date.getTime() integer
    // if (
    //   window.performance &&
    //   window.performance.now &&
    //   window.performance.timing &&
    //   window.performance.timing.navigationStart
    // ) {
    //   return window.performance.now();
    // }
    return new Date().getTime();
}

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt$1(all) {
    all = all || Object.create(null);
    return {
        /**
         * Register an event handler for the given type.
         *
         * @param  {String} type	Type of event to listen for
         * @param  {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on: function (type, handler) {
            (all[type] || (all[type] = [])).push(handler);
        },
        /**
         * Remove an event handler for the given type.
         *
         * @param  {String} type	Type of event to unregister `handler` from
         * @param  {Function} handler Handler function to remove
         * @memberOf mitt
         */
        off: function (type, handler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        /**
         * Invoke all handlers for the given type.
         *
         * @param {String} type  The event type to invoke
         * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit: function (type, evt) {
            (all[type] || []).slice().map(function (handler) {
                handler(evt);
            });
        }
    };
}

/**
 * Provenance Graph implementation
 *
 * @param version The version of the software to track the provenance of
 *
 */
var ProvenanceGraph = /** @class */ (function () {
    function ProvenanceGraph(application, userid, rootNode) {
        if (userid === void 0) { userid = 'Unknown'; }
        this._nodes = {};
        this._mitt = mitt$1();
        this.application = application;
        if (rootNode) {
            this.root = rootNode;
        }
        else {
            this.root = {
                id: generateUUID(),
                label: 'Root',
                metadata: {
                    createdBy: userid,
                    createdOn: generateTimestamp()
                },
                children: [],
                artifacts: {}
            };
        }
        this.addNode(this.root);
        this._current = this.root;
    }
    ProvenanceGraph.prototype.addNode = function (node) {
        if (this._nodes[node.id]) {
            throw new Error('Node already added');
        }
        this._nodes[node.id] = node;
        this._mitt.emit('nodeAdded', node);
    };
    ProvenanceGraph.prototype.getNode = function (id) {
        var result = this._nodes[id];
        if (!result) {
            throw new Error('Node id not found');
        }
        return this._nodes[id];
    };
    Object.defineProperty(ProvenanceGraph.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (node) {
            if (!this._nodes[node.id]) {
                throw new Error('Node id not found');
            }
            this._current = node;
            this._mitt.emit('currentChanged', node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceGraph.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceGraph.prototype.emitNodeChangedEvent = function (node) {
        /* istanbul ignore if */
        if (!this._nodes[node.id]) {
            throw new Error('Node id not found');
        }
        this._mitt.emit('nodeChanged', node);
    };
    ProvenanceGraph.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceGraph.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceGraph;
}());

class ProvenanceSlide {
    get id() {
        return this._id;
    }
    get node() {
        return this._node;
    }
    set node(value) {
        this._node = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
    }
    get delay() {
        return this._delay;
    }
    set delay(value) {
        this._delay = value;
    }
    addAnnotation(annotation) {
        this._annotations.push(annotation);
    }
    removeAnnotation(annotation) {
        const index = this._annotations.indexOf(annotation);
        this._annotations.splice(index, 1);
    }
    get annotations() {
        return this._annotations;
    }
    constructor(name, duration, delay, annotations = [], node = null) {
        this._id = generateUUID();
        this._name = name;
        this._duration = duration;
        this._delay = delay;
        this._annotations = annotations;
        this._node = node;
    }
}

function firstArgThis(f) {
    return function (...args) {
        return f(this, ...args);
    };
}
class ProvenanceSlidedeckVisualization {
    constructor(slideDeck, elm) {
        this._tableHeight = 1000;
        this._tableWidth = 300;
        this._minimumSlideDuration = 3100;
        this._barHeightTimeMultiplier = .01;
        this._barWidth = 300;
        this._barPadding = 5;
        this._resizebarheight = 5;
        this._maxSlides = 20;
        this._timeIndexedSlides = [];
        this._index = (slide) => {
            return this._slideDeck.slides.indexOf(slide);
        };
        this.onDelete = (slide) => {
            this._slideDeck.removeSlide(slide);
        };
        this.onSelect = (slide) => {
            if (d3__WEBPACK_IMPORTED_MODULE_0__["event"].defaultPrevented)
                return;
            this._slideDeck.selectedSlide = slide;
        };
        this.onAdd = () => {
            let slideDeck = this._slideDeck;
            const node = slideDeck.graph.current;
            const slide = new ProvenanceSlide(node.label, 5000, 0, [], node);
            slideDeck.addSlide(slide, slideDeck.selectedSlide
                ? slideDeck.slides.indexOf(slideDeck.selectedSlide) + 1
                : slideDeck.slides.length);
        };
        this.moveDragged = (that, draggedObject) => {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(that).attr("transform", (slide) => {
                const originalY = this.previousSlidesHeight(slide);
                const draggedY = d3__WEBPACK_IMPORTED_MODULE_0__["event"].y;
                const myIndex = this._slideDeck.slides.indexOf(slide);
                if (draggedY < originalY && myIndex > 0) {
                    // check upwards                
                    const previousSlide = this._slideDeck.slides[myIndex - 1];
                    let previousSlideCenterY = this.previousSlidesHeight(previousSlide) + (this.barTotalHeight(previousSlide) / 2);
                    if (draggedY < previousSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex - 1);
                    }
                }
                else if (draggedY > originalY && myIndex < this._slideDeck.slides.length - 1) {
                    // check downwards
                    const nextSlide = this._slideDeck.slides[myIndex + 1];
                    let nextSlideCenterY = this.previousSlidesHeight(nextSlide) + (this.barTotalHeight(nextSlide) / 2);
                    if (draggedY > nextSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex + 1);
                    }
                }
                return "translate(0," + d3__WEBPACK_IMPORTED_MODULE_0__["event"].y + ")";
            });
        };
        this.moveDragended = (that, draggedObject) => {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(that).classed("active", false)
                .attr("transform", (slide) => {
                return "translate(0," + this.previousSlidesHeight(slide) + ")";
            });
        };
        this.delayDragged = (that, slide) => {
            slide.delay = Math.max(0, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y) / this._barHeightTimeMultiplier;
            this.update();
        };
        this.delaySubject = (that, slide) => {
            return { y: this.barDelayHeight(slide) };
        };
        this.durationDragged = (that, slide) => {
            slide.duration = Math.max(0, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y) / this._barHeightTimeMultiplier;
            this.update();
        };
        this.durationSubject = (that, slide) => {
            return { y: this.barDurationHeight(slide) };
        };
        this._slideDeck = slideDeck;
        this._root = Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(elm);
        this._slideTable = this._root.append('svg')
            .attr('class', 'slide__table')
            .attr('height', this._tableHeight).attr('width', this._tableWidth);
        this._slideTable.append('rect')
            .attr('class', 'slides_background_rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', this._tableHeight)
            .attr('width', this._tableWidth);
        slideDeck.on('slideAdded', () => this.update());
        slideDeck.on('slideRemoved', () => this.update());
        slideDeck.on('slidesMoved', () => this.update());
        slideDeck.on('slideSelected', () => this.update());
        const addSlideButton = this._root.append('button').text('add slide');
        addSlideButton.on('click', this.onAdd);
        this.update();
    }
    moveDragStarted(draggedObject) {
        Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this).raise().classed("active", true);
    }
    barDelayHeight(slide) {
        let calculatedHeight = this._barHeightTimeMultiplier * slide.delay;
        return Math.max(calculatedHeight, 0);
    }
    barDurationHeight(slide) {
        let calculatedHeight = this._barHeightTimeMultiplier * slide.duration;
        return Math.max(calculatedHeight, this._minimumSlideDuration * this._barHeightTimeMultiplier);
    }
    barTotalHeight(slide) {
        let calculatedHeight = this.barDelayHeight(slide) + this.barDurationHeight(slide) + 2 * this._resizebarheight;
        return calculatedHeight;
    }
    previousSlidesHeight(slide) {
        let myIndex = this._slideDeck.slides.indexOf(slide);
        let calculatedHeight = 0;
        for (let i = 0; i < myIndex; i++) {
            calculatedHeight += this.barTotalHeight(this._slideDeck.slides[i]);
        }
        return calculatedHeight;
    }
    updateTimeIndices(slideDeck) {
        this._timeIndexedSlides = [];
        let timeIndex = 0;
        slideDeck.slides.forEach(slide => {
            this._timeIndexedSlides.push({ slide: slide, startTime: timeIndex });
            timeIndex += slide.delay + slide.duration;
        });
    }
    update() {
        this.updateTimeIndices(this._slideDeck);
        const allExistingNodes = this._slideTable.selectAll('g')
            .data(this._slideDeck.slides, (d) => { return d.id; });
        const newNodes = allExistingNodes.enter().append('g')
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .clickDistance([2, 2])
            .on('start', this.moveDragStarted)
            .on('drag', firstArgThis(this.moveDragged))
            .on('end', firstArgThis(this.moveDragended)));
        newNodes.append('rect')
            .attr('class', 'slides_delay_resize')
            .attr('x', this._barPadding)
            .attr('width', this._barWidth - 2 * this._barPadding)
            .attr('height', this._resizebarheight)
            .attr('cursor', 'ns-resize')
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .subject(firstArgThis(this.delaySubject))
            .on('drag', firstArgThis(this.delayDragged)));
        newNodes.append('rect')
            .attr('class', 'slides_delay_rect')
            .attr('x', this._barPadding)
            .attr('y', 0)
            .attr('width', this._barWidth - 2 * this._barPadding)
            .on('click', this.onSelect);
        newNodes.append('rect')
            .attr('class', 'slides_rect')
            .attr('x', this._barPadding)
            .attr('width', this._barWidth - 2 * this._barPadding)
            .attr('cursor', 'move')
            .on('click', this.onSelect);
        newNodes.append('rect')
            .attr('class', 'slides_duration_resize')
            .attr('x', this._barPadding)
            .attr('width', this._barWidth - 2 * this._barPadding)
            .attr('height', this._resizebarheight)
            .attr('cursor', 'ns-resize')
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .subject(firstArgThis(this.durationSubject))
            .on('drag', firstArgThis(this.durationDragged)));
        newNodes.append('text')
            .attr('class', 'slides_text')
            .attr('x', 2 * this._barPadding)
            .attr("dy", ".35em");
        newNodes.append('text')
            .attr('class', 'slides_delaytext')
            .attr('x', this._barWidth / 2 + 2 * this._barPadding)
            .attr("dy", ".35em");
        newNodes.append('text')
            .attr('class', 'slides_durationtext')
            .attr('x', this._barWidth / 2 + 2 * this._barPadding)
            .attr("dy", ".35em");
        // newNodes.append('rect')
        //     .attr('class', 'slides_delete_rect')
        //     .attr('x', this._barWidth - 50 + 2 * this._barPadding)
        //     .attr('width', 50 - 4 * this._barPadding)
        //     .attr('height', 50 - 4 * this._barPadding)
        //     .attr('id', (data: IProvenanceSlide) => { return 'delete_' + data.id; })
        //     .on('click', this.onDelete);
        newNodes.append('image')
            .attr('class', 'slides_delete_icon')
            .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg")
            .attr('x', this._barWidth - 50 + 2 * this._barPadding)
            .attr("width", 32)
            .attr("height", 32)
            .on('click', this.onDelete);
        // Update all nodes
        const allNodes = newNodes.merge(allExistingNodes)
            .attr("transform", (slide) => {
            return "translate(0," + this.previousSlidesHeight(slide) + ")";
        });
        allNodes.select('rect.slides_delay_rect')
            .attr('height', (slide) => { return this.barDelayHeight(slide); });
        allNodes.select('rect.slides_delay_resize')
            .attr('y', (slide) => { return this.barDelayHeight(slide); });
        allNodes.select('rect.slides_rect')
            .attr('selected', (slide) => { return this._slideDeck.selectedSlide === slide; })
            .attr('y', (slide) => { return this.barDelayHeight(slide) + this._resizebarheight; })
            .attr('height', (slide) => { return this.barDurationHeight(slide); });
        allNodes.select('rect.slides_duration_resize')
            .attr('y', (slide) => { return this.barTotalHeight(slide) - this._resizebarheight; });
        // allNodes.select('rect.slides_delete_rect')
        //     .attr('y', (slide: IProvenanceSlide) => { return this.barDelayHeight(slide) + this._resizebarheight; });
        allNodes.select('image.slides_delete_icon')
            .attr('y', (slide) => { return this.barDelayHeight(slide) + this._resizebarheight; });
        allNodes.select('text.slides_text')
            .attr('y', (slide) => { return this.barDelayHeight(slide) + this._resizebarheight + 2 * this._barPadding; })
            .text((slide) => { return slide.name; });
        allNodes.select('text.slides_delaytext')
            .attr('y', (slide) => { return this.barDelayHeight(slide) + this._resizebarheight + 1 * this._barPadding; })
            .text((slide) => { return 'transition: ' + slide.delay / 1000; });
        allNodes.select('text.slides_durationtext')
            .attr('y', (slide) => { return this.barDelayHeight(slide) + this._resizebarheight + 4 * this._barPadding; })
            .text((slide) => { return 'duration: ' + slide.duration / 1000; });
        allExistingNodes.exit().remove();
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var STATUS;
(function (STATUS) {
    STATUS[STATUS["IDLE"] = 0] = "IDLE";
    STATUS[STATUS["PLAYING"] = 1] = "PLAYING";
})(STATUS || (STATUS = {}));
const wait = (duration) => new Promise(resolve => setTimeout(resolve, duration));
class ProvenanceSlidePlayer {
    constructor(slides, selectCallback) {
        this._selectCallback = selectCallback;
        this._slides = slides;
        this._currentSlideIndex = 0;
        this._status = STATUS.IDLE;
    }
    setSlideIndex(slideIndex) {
        this._currentSlideIndex = slideIndex;
    }
    get slides() {
        return this._slides;
    }
    get currentSlideIndex() {
        return this._currentSlideIndex;
    }
    play() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const shouldPlayNext = () => (this._status === STATUS.PLAYING &&
                this._currentSlideIndex < this._slides.length - 1);
            if (this._status === STATUS.IDLE) {
                this._status = STATUS.PLAYING;
                do {
                    const slide = this._slides[this._currentSlideIndex];
                    yield wait(slide.duration);
                    if (shouldPlayNext()) {
                        this._currentSlideIndex += 1;
                        this._selectCallback(this._slides[this._currentSlideIndex]);
                    }
                } while (shouldPlayNext());
            }
            this._status = STATUS.IDLE;
        });
    }
    get status() {
        return this._status;
    }
    stop() {
        this._status = STATUS.IDLE;
    }
}

class ProvenanceSlidedeck {
    constructor(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt();
        this._application = application;
        this._graph = traverser.graph;
        this._traverser = traverser;
        this._selectedSlide = null;
    }
    get application() {
        return this._application;
    }
    addSlide(slide, index) {
        if (!index || isNaN(index) || !Number.isInteger(index) || index > this._slides.length || index < 0) {
            index = this._slides.length;
        }
        if (slide && this._slides.indexOf(slide) >= 0) {
            throw (new Error('Cannot add a slide that is already in the deck'));
        }
        if (!slide) {
            const node = this._graph.current;
            slide = new ProvenanceSlide(node.label, 1, 0, [], node);
        }
        if (this._slides.length === 0) {
            this._selectedSlide = slide;
        }
        this._slides.splice(index, 0, slide);
        this._mitt.emit('slideAdded', slide);
        return slide;
    }
    removeSlideAtIndex(index) {
        let deletedSlides = this._slides.splice(index, 1);
        // This can only be 1 slide now, therefore this is ok.
        if (this._selectedSlide === deletedSlides[0]) {
            this.selectedSlide = null;
        }
        this._mitt.emit('slideRemoved', deletedSlides[0]);
    }
    removeSlide(slide) {
        this.removeSlideAtIndex(this._slides.indexOf(slide));
    }
    get selectedSlide() {
        return this._selectedSlide;
    }
    moveSlide(indexFrom, indexTo) {
        if (indexTo < 0 || indexTo > this.slides.length - 1) {
            throw new Error('target index out of bounds');
        }
        if (indexTo >= this._slides.length) {
            let k = indexTo - this._slides.length + 1;
            while (k--) {
                this._slides.push(this._captainPlaceholder);
            }
        }
        this._slides.splice(indexTo, 0, this._slides.splice(indexFrom, 1)[0]);
        this._mitt.emit('slidesMoved', this._slides);
    }
    startTime(slide) {
        const index = this._slides.indexOf(slide);
        let previousTime = 0;
        for (let i = 0; i < index; i++) {
            previousTime += this._slides[i].delay;
            previousTime += this._slides[i].duration;
        }
        return previousTime;
    }
    slideAtTime(time) {
        let index = 0;
        let currentSlide = null;
        while (time >= 0 && index < this.slides.length) {
            currentSlide = this.slides[index];
            let nextSlideOffset = currentSlide.delay + currentSlide.duration;
            if (time - nextSlideOffset < 0) {
                break;
            }
            time -= nextSlideOffset;
            index++;
        }
        return currentSlide;
    }
    set selectedSlide(slide) {
        if (slide && slide.node) {
            this._traverser.toStateNode(slide.node.id);
        }
        this._selectedSlide = slide;
        this._mitt.emit('slideSelected', slide);
    }
    get slides() { return this._slides; }
    get graph() { return this._graph; }
    on(type, handler) {
        this._mitt.on(type, handler);
    }
    off(type, handler) {
        this._mitt.off(type, handler);
    }
}


//# sourceMappingURL=provenance-slide-deck.es5.js.map


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-brainvis-canvas {\n  flex: 1;\n}\n#bottom-container {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background-color: rgba(0,0,0,.8);\n}\nmat-sidenav {\n  overflow: visible;\n  visibility: visible !important;\n  background-color: rgba(0, 0, 0, .8)\n}\nmat-sidenav-container, mat-sidenav-content {\n  display: flex;\n  flex: 1;\n}\n#sidenav-trigger {\n  position: absolute;\n  left: -50px;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container hasBackdrop=\"false\">\n  <mat-sidenav position=\"end\" #sidenav mode=\"over\" [opened]=\"false\" hasBackdrop=\"false\">\n    <button id=\"sidenav-trigger\" color=\"primary\" style=\"color: white\" mat-icon-button (click)=\"sidenav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n\n    Sidenav content\n    <app-provenance-visualization></app-provenance-visualization>\n    <app-provenance-slides></app-provenance-slides>\n  </mat-sidenav>\n\n\n  <mat-sidenav-content>\n    <app-brainvis-canvas #canvas></app-brainvis-canvas>\n    <div id=\"bottom-container\">\n      <app-brainvis-canvas-controls [canvas]=\"canvas\"></app-brainvis-canvas-controls>\n    </div>\n    <!--<p><mat-slide-toggle>sidenav.opened</mat-slide-toggle></p>-->\n    <!--<p></p>-->\n  </mat-sidenav-content>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provenance.service */ "./src/app/provenance.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(provenance) {
        this.provenance = provenance;
        this.title = 'app';
        // console.log(arg);
        console.log('constructor');
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('init?');
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_provenance_service__WEBPACK_IMPORTED_MODULE_1__["ProvenanceService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./provenance.service */ "./src/app/provenance.service.ts");
/* harmony import */ var _brainvis_canvas_brainvis_canvas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./brainvis-canvas/brainvis-canvas.component */ "./src/app/brainvis-canvas/brainvis-canvas.component.ts");
/* harmony import */ var _brainvis_canvas_controls_brainvis_canvas_controls_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./brainvis-canvas-controls/brainvis-canvas-controls.component */ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _provenance_visualization_provenance_visualization_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./provenance-visualization/provenance-visualization.component */ "./src/app/provenance-visualization/provenance-visualization.component.ts");
/* harmony import */ var _provenance_slides_provenance_slides_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./provenance-slides/provenance-slides.component */ "./src/app/provenance-slides/provenance-slides.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _brainvis_canvas_brainvis_canvas_component__WEBPACK_IMPORTED_MODULE_5__["BrainvisCanvasComponent"],
                _brainvis_canvas_controls_brainvis_canvas_controls_component__WEBPACK_IMPORTED_MODULE_6__["BrainvisCanvasControlsComponent"],
                _provenance_visualization_provenance_visualization_component__WEBPACK_IMPORTED_MODULE_9__["ProvenanceVisualizationComponent"],
                _provenance_slides_provenance_slides_component__WEBPACK_IMPORTED_MODULE_10__["ProvenanceSlidesComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            ],
            providers: [_provenance_service__WEBPACK_IMPORTED_MODULE_4__["ProvenanceService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: flex;\n  color: white;\n  margin: 1em;\n  flex-direction: column;\n}\n"

/***/ }),

/***/ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"noSelectText\">\n  Light direction\n  <div>\n    <div class=\"circle\" id=\"circle\">\n      <div class='dot' id=\"dot\"></div>\n    </div>\n  </div>\n</div>\n<mat-slide-toggle [(ngModel)]=\"canvas.showSliceHandle\">\n  Show slice handle\n</mat-slide-toggle>\n<mat-slide-toggle [(ngModel)]=\"canvas.showSlice\">\n  Show slice\n</mat-slide-toggle>\n<mat-slide-toggle [(ngModel)]=\"canvas.showObjects\">\n  Show segmented objects\n</mat-slide-toggle>\n<div>\n  <button mat-button color=\"primary\" id=\"alignButton\">Align to slice</button>\n</div>\n\n"

/***/ }),

/***/ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.ts ***!
  \********************************************************************************/
/*! exports provided: BrainvisCanvasControlsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrainvisCanvasControlsComponent", function() { return BrainvisCanvasControlsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _brainvis_canvas_brainvis_canvas_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../brainvis-canvas/brainvis-canvas.component */ "./src/app/brainvis-canvas/brainvis-canvas.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BrainvisCanvasControlsComponent = /** @class */ (function () {
    function BrainvisCanvasControlsComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _brainvis_canvas_brainvis_canvas_component__WEBPACK_IMPORTED_MODULE_1__["BrainvisCanvasComponent"])
    ], BrainvisCanvasControlsComponent.prototype, "canvas", void 0);
    BrainvisCanvasControlsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-brainvis-canvas-controls',
            template: __webpack_require__(/*! ./brainvis-canvas-controls.component.html */ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.html"),
            styles: [__webpack_require__(/*! ./brainvis-canvas-controls.component.css */ "./src/app/brainvis-canvas-controls/brainvis-canvas-controls.component.css")]
        })
    ], BrainvisCanvasControlsComponent);
    return BrainvisCanvasControlsComponent;
}());



/***/ }),

/***/ "./src/app/brainvis-canvas/brainvis-canvas.component.css":
/*!***************************************************************!*\
  !*** ./src/app/brainvis-canvas/brainvis-canvas.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n}\n"

/***/ }),

/***/ "./src/app/brainvis-canvas/brainvis-canvas.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/brainvis-canvas/brainvis-canvas.component.ts ***!
  \**************************************************************/
/*! exports provided: BrainvisCanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrainvisCanvasComponent", function() { return BrainvisCanvasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var ami_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ami.js */ "./node_modules/ami.js/build/ami.js");
/* harmony import */ var ami_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ami_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _trackball__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trackball */ "./src/app/brainvis-canvas/trackball.ts");
/* harmony import */ var _sliceManipulatorWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sliceManipulatorWidget */ "./src/app/brainvis-canvas/sliceManipulatorWidget.ts");
/* harmony import */ var _stlLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stlLoader */ "./src/app/brainvis-canvas/stlLoader.ts");
/* harmony import */ var _intersectionManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./intersectionManager */ "./src/app/brainvis-canvas/intersectionManager.ts");
/* harmony import */ var _objectSelector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./objectSelector */ "./src/app/brainvis-canvas/objectSelector.ts");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../provenance.service */ "./src/app/provenance.service.ts");
/* harmony import */ var _provenanceActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./provenanceActions */ "./src/app/brainvis-canvas/provenanceActions.ts");
/* harmony import */ var _provenanceListeners__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./provenanceListeners */ "./src/app/brainvis-canvas/provenanceListeners.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BrainvisCanvasComponent = /** @class */ (function (_super) {
    __extends(BrainvisCanvasComponent, _super);
    function BrainvisCanvasComponent(elem, provenance) {
        var _this = _super.call(this) || this;
        _this._showSlice = true;
        _this._showSliceHandle = true;
        _this.onShowSlice = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.onShowSliceHandle = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
        _this.objects = new three__WEBPACK_IMPORTED_MODULE_1__["Object3D"](); // all the loaded objects go in here
        _this.renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]();
        _this.lightRotation = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 0);
        _this.animate = function () {
            requestAnimationFrame(_this.animate);
            // update light position
            if (_this.stackHelper) {
                var lightDir = _this.camera.position.clone();
                lightDir.sub(_this.stackHelper.stack.worldCenter());
                lightDir.normalize();
                var lightRotationTemp = _this.lightRotation.clone();
                lightRotationTemp.applyQuaternion(_this.camera.quaternion);
                _this.directionalLight.position.set(lightDir.x, lightDir.y, lightDir.z);
                _this.directionalLight.position.add(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](lightRotationTemp.x, lightRotationTemp.y, lightRotationTemp.z));
                _this.directionalLight.position.normalize();
            }
            _this.controls.update();
            _this.render();
        };
        _this.getSlicePlaneChanges = function (event) {
            console.log(event);
            var position = event.position.toArray();
            var direction = event.direction.toArray();
            var oldPosition = event.oldPosition.toArray();
            var oldDirection = event.oldDirection.toArray();
            return { position: position, direction: direction, oldPosition: oldPosition, oldDirection: oldDirection };
        };
        _this.onSlicePlaneOrientationChange = function (event) {
            var changes = _this.getSlicePlaneChanges(event);
            _this.dispatchEvent({
                type: 'sliceOrientationChanged',
                changes: changes
            });
        };
        _this.onSlicePlaneZoomChange = function (event) {
            var changes = _this.getSlicePlaneChanges(event);
            _this.dispatchEvent({
                type: 'sliceZoomChanged',
                changes: changes
            });
        };
        _this.onSliceVisibilityChange = function (event) {
            _this.dispatchEvent({
                type: 'sliceVisibilityChanged',
                change: event
            });
        };
        _this.onSliceHandleVisibilityChange = function (event) {
            _this.dispatchEvent({
                type: 'sliceHandleVisibilityChanged',
                change: event
            });
        };
        _this.sliceToggled = function (checkBox) {
            _this.toggleSlice(checkBox.currentTarget.checked);
            _this.onSliceVisibilityChange(checkBox.currentTarget.checked);
        };
        _this.sliceHandleToggled = function (checkBox) {
            _this.toggleSliceHandle(checkBox.currentTarget.checked);
            _this.onSliceHandleVisibilityChange(checkBox.currentTarget.checked);
        };
        // slice alignment
        _this.moveCameraTo2DSlice = function (event) {
            if (_this.stackHelper) {
                // if this comes from the button we dispach an event to the provenance graph
                // the graph will then call this function again
                if (event) {
                    _this.dispatchEvent({
                        type: 'sliceModeChanged',
                        mode2D: true
                    });
                    return;
                }
                _this.controls.finishCurrentTransition();
                _this.sliceManipulator.finishCurrentTransition();
                _this.cachedCameraOrigin = _this.controls.camera.position.clone();
                _this.cachedCameraTarget = _this.controls.target.clone();
                _this.cachedCameraUp = _this.controls.camera.up.clone();
                _this.cachedSliceHandleVisibility = _this.sliceManipulator.visible;
                _this.cachedObjectsShown = _this.objects.visible;
                _this.sliceManipulator.visible = false;
                _this.objects.visible = false;
                var cameraPosition = _this.stackHelper.slice.planePosition.clone();
                cameraPosition.addScaledVector(_this.stackHelper.slice.planeDirection, 150.0);
                // choose a up vector that does not point in the same way as the target plane
                var upVector = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 1);
                if (Math.abs(_this.stackHelper.slice.planeDirection.x) < 0.001 && Math.abs(_this.stackHelper.slice.planeDirection.y) < 0.001) {
                    upVector.set(0, 1, 0);
                }
                _this.controls.changeCamera(cameraPosition, _this.stackHelper.slice.planePosition.clone(), upVector, 0);
                _this.alignButton.removeEventListener('click', _this.moveCameraTo2DSlice);
                _this.alignButton.addEventListener('click', _this.moveCameraFrom2DSlice);
                _this.alignButton.value = 'Back to 3D';
                _this.sliceCheckbox.disabled = true;
                _this.sliceHandleCheckbox.disabled = true;
                _this.showObjectCheckbox.disabled = true;
                _this.controls.enabled = false;
            }
        };
        _this.moveCameraFrom2DSlice = function (event) {
            if (_this.stackHelper) {
                // if this comes from the button we dispach an event to the provenance graph
                // the graph will then call this function again
                if (event) {
                    _this.dispatchEvent({
                        type: 'sliceModeChanged',
                        mode2D: false
                    });
                    return;
                }
                _this.controls.enabled = true;
                _this.controls.changeCamera(_this.cachedCameraOrigin, _this.cachedCameraTarget, _this.cachedCameraUp, 0);
                _this.alignButton.removeEventListener('click', _this.moveCameraFrom2DSlice);
                _this.alignButton.addEventListener('click', _this.moveCameraTo2DSlice);
                _this.alignButton.value = 'Alight to slice';
                _this.sliceCheckbox.disabled = false;
                _this.sliceHandleCheckbox.disabled = false;
                _this.showObjectCheckbox.disabled = false;
                _this.sliceManipulator.visible = _this.cachedSliceHandleVisibility;
                _this.objects.visible = _this.cachedObjectsShown;
            }
        };
        _this.onShowObjectsChange = function (visible) {
            _this.dispatchEvent({
                type: 'objectsVisibilityChanged',
                change: visible
            });
        };
        _this.showObjectsToggled = function (checkBox) {
            _this.toggleObjects(checkBox.currentTarget.checked);
            _this.onShowObjectsChange(checkBox.currentTarget.checked);
        };
        Object(_provenanceActions__WEBPACK_IMPORTED_MODULE_9__["registerActions"])(provenance.registry, _this);
        Object(_provenanceListeners__WEBPACK_IMPORTED_MODULE_10__["addListeners"])(provenance.tracker, _this);
        _this.elem = elem.nativeElement;
        return _this;
    }
    Object.defineProperty(BrainvisCanvasComponent.prototype, "showSlice", {
        get: function () { return this._showSlice; },
        set: function (showSlice) {
            this._showSlice = showSlice;
            this.toggleSlice(showSlice);
            this.onShowSlice.emit(showSlice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrainvisCanvasComponent.prototype, "showSliceHandle", {
        get: function () { return this._showSliceHandle; },
        set: function (showSliceHandle) {
            this._showSliceHandle = showSliceHandle;
            this.toggleSliceHandle(showSliceHandle);
            this.onShowSliceHandle.emit(showSliceHandle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrainvisCanvasComponent.prototype, "showObjects", {
        get: function () { return this._showObjects; },
        set: function (showObjects) {
            this._showObjects = showObjects;
        },
        enumerable: true,
        configurable: true
    });
    BrainvisCanvasComponent.prototype.ngOnInit = function () {
        // todo: remove object from window
        window.canvas = this;
        this.width = this.elem.clientWidth;
        this.height = this.elem.clientHeight;
        this.scene.background = new three__WEBPACK_IMPORTED_MODULE_1__["Color"]('black');
        this.camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](75, this.width / this.height, 0.1, 10000);
        this.renderer.setSize(this.width, this.height);
        var canvasElm = this.renderer.domElement;
        this.elem.appendChild(canvasElm);
        canvasElm.style.display = 'block';
        // Setup controls
        this.controls = new _trackball__WEBPACK_IMPORTED_MODULE_3__["default"](this.camera, this.renderer.domElement);
        this.scene.add(this.objects);
        // Initial camera position
        this.controls.position0.set(0, 0, 5);
        this.controls.reset();
        this.initScene();
        // // div with buttons
        // const elem2 = document.createElement('div');
        // elem2.classList.add('gui');
        // elem2.innerHTML = ` <div >
        //                         <div class="noSelectText">
        //                             Light direction
        //                             <div>
        //                                 <div class="circle" id="circle">
        //                                     <div class='dot' id="dot"></div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div>
        //                             <input type="checkbox" checked id="sliceCheckbox">Show slice</input><br/>
        //                             <input type="checkbox" id="sliceHandleCheckbox">Show slice handle</input><br/>
        //                             <input type="button" id="alignButton" value="Alight to slice" class="btn" style="color: black"><br/>
        //                             </br>
        //                             <input type="checkbox" checked id="showObjectCheckbox">Show segmented objects</input><br/>
        //                         </div>
        //                     </div>`;
        // this.elem.appendChild(elem2);
        // this.sliceCheckbox = document.getElementById('sliceCheckbox') as HTMLInputElement;
        // this.sliceCheckbox.addEventListener('change', this.sliceToggled);
        // this.sliceHandleCheckbox = document.getElementById('sliceHandleCheckbox') as HTMLInputElement;
        // this.sliceHandleCheckbox.addEventListener('change', this.sliceHandleToggled);
        // this.showObjectCheckbox = document.getElementById('showObjectCheckbox') as HTMLInputElement;
        // this.showObjectCheckbox.addEventListener('change', this.showObjectsToggled);
        //
        // this.alignButton = document.getElementById('alignButton') as HTMLInputElement;
        // this.alignButton.addEventListener('click', this.moveCameraTo2DSlice);
        // const circleElement = document.getElementById('circle');
        // let isDragging;
        // circleElement.addEventListener('mousedown', function(e) {
        //   return isDragging = true;
        // });
        // document.addEventListener('mouseup', function(e) {
        //   return isDragging = false;
        // });
        // document.addEventListener('mousemove', function(e) {
        //   let centerX;
        //   let centerY;
        //   let circle;
        //   let deltaX;
        //   let deltY;
        //   let posX;
        //   let posY;
        //   let dot;
        //   if (isDragging) {
        //     circle = document.getElementById('circle');
        //     const boundRect = circle.getBoundingClientRect();
        //     centerX = boundRect.x + boundRect.width / 2;
        //     centerY = boundRect.y + boundRect.height / 2;
        //     posX = e.pageX;
        //     posY = e.pageY;
        //     deltaX = centerX - posX;
        //     deltY = centerY - posY;
        //     const posFromCenter = new THREE.Vector3(deltaX, deltY, 0);
        //     posFromCenter.clampLength(0, boundRect.width / 2);
        //     dot = document.getElementById('dot');
        //     const dotWidth = dot.getBoundingClientRect().width;
        //     dot.style.transform = 'translate(' + (boundRect.width / 2 - posFromCenter.x - dotWidth) + 'px,' + (boundRect.height / 2 - posFromCenter.y - dotWidth / 2) + 'px)';
        //     posFromCenter.divideScalar(50.0);
        //     this.lightRotation = posFromCenter.clone();
        //     this.lightRotation.setX(-this.lightRotation.x);
        //     return true;
        //   }
        // }.bind(this));
        this.objectSelector = new _objectSelector__WEBPACK_IMPORTED_MODULE_7__["default"](this.objects);
        this.intersectionManager = new _intersectionManager__WEBPACK_IMPORTED_MODULE_6__["IntersectionManager"](this.renderer.domElement, this.camera);
        this.intersectionManager.addListener(this.objectSelector);
        this.addEventListeners();
        this.animate();
    };
    BrainvisCanvasComponent.prototype.initScene = function () {
        // Setup lights
        this.scene.add(new three__WEBPACK_IMPORTED_MODULE_1__["AmbientLight"](0x222222));
        this.directionalLight = new three__WEBPACK_IMPORTED_MODULE_1__["DirectionalLight"](0xffffff, 1);
        this.directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(this.directionalLight);
        // Setup loader
        var loader = new ami_js__WEBPACK_IMPORTED_MODULE_2__["VolumeLoader"](this.renderer.domElement);
        var t1 = [
            '36747136', '36747150', '36747164', '36747178', '36747192', '36747206', '36747220', '36747234', '36747248', '36747262', '36747276', '36747290', '36747304', '36747318', '36747332', '36747346', '36747360', '36747374', '36747388', '36747402', '36747416', '36747430', '36747444', '36747458', '36747472', '36747486', '36747500', '36747514', '36747528', '36747542', '36747556', '36747570', '36747584', '36747598', '36747612', '36747626', '36747640', '36747654', '36747668', '36747682', '36747696', '36747710', '36747724', '36747738', '36747752', '36747766', '36747780', '36747794', '36747808', '36747822', '36747836', '36747850', '36747864', '36747878', '36747892', '36747906', '36747920', '36747934', '36747948', '36747962', '36747976', '36747990', '36748004', '36748018', '36748032', '36748046', '36748060', '36748074', '36748088', '36748102', '36748116', '36748130', '36748144', '36748158', '36748172', '36748186', '36748578', '36748592', '36748606', '36748620', '36748634', '36748648', '36748662', '36748676', '36748690', '36748704', '36748718', '36748732', '36748746', '36748760', '36748774', '36748788', '36748802', '36748816', '36748830', '36748844', '36748858', '36748872', '36748886', '36748900', '36748914', '36748928', '36748942', '36748956', '36748970', '36748984', '36748998', '36749012', '36749026', '36749040', '36749054', '36749068', '36749082', '36749096', '36749110', '36749124', '36749138', '36749152', '36749166', '36749180', '36749194', '36749208', '36749222', '36749236', '36749250', '36749264', '36749278', '36749292', '36749306', '36749320', '36749334', '36749348', '36749362', '36749376', '36749390', '36749404', '36749418', '36749446', '36749460', '36749474', '36749488', '36749502', '36749516', '36749530', '36749544', '36749558', '36749572', '36749586', '36749600', '36749614', '36749628', '36749642', '36749656', '36749670', '36749684', '36749698', '36749712', '36749726', '36749740', '36749754', '36749768', '36749782', '36749796', '36749810', '36749824', '36749838', '36749852', '36749866', '36749880', '36749894', '36749908', '36749922', '36749936', '36749950', '36749964'
        ];
        var files = t1.map(function (v) {
            return 'https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/' + v;
        });
        loader
            .load(files)
            .then(function () {
            // merge files into clean series/stack/frame structure
            var series = loader.data[0].mergeSeries(loader.data);
            loader.free();
            // loader = null;
            // be carefull that series and target stack exist!
            this.stackHelper = new ami_js__WEBPACK_IMPORTED_MODULE_2__["StackHelper"](series[0].stack[0]);
            this.stackHelper.border.color = 0xffeb3b;
            this.scene.add(this.stackHelper);
            // setup slice
            var centerLPS = this.stackHelper.stack.worldCenter();
            this.stackHelper.slice.aabbSpace = 'LPS';
            this.stackHelper.slice.planePosition.x = centerLPS.x;
            this.stackHelper.slice.planePosition.y = centerLPS.y;
            this.stackHelper.slice.planePosition.z = centerLPS.z;
            this.stackHelper.slice.planeDirection = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1, 0, 0).normalize();
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            var sliceGeometry = new _intersectionManager__WEBPACK_IMPORTED_MODULE_6__["StaticGeometryListener"](this.stackHelper.slice);
            this.intersectionManager.addListener(sliceGeometry);
            // slice manipulator
            this.sliceManipulator = new _sliceManipulatorWidget__WEBPACK_IMPORTED_MODULE_4__["default"](this.stackHelper, this.renderer.domElement, this.camera);
            this.scene.add(this.sliceManipulator);
            // this.sliceManipulator.visible = false;
            this.sliceManipulator.addEventListener('zoomChange', this.onSlicePlaneZoomChange);
            this.sliceManipulator.addEventListener('orientationChange', this.onSlicePlaneOrientationChange);
            this.sliceManipulator.visible = this._showSliceHandle;
            this.intersectionManager.addListener(this.sliceManipulator);
            this.controls.initEventListeners();
            // this.loadCompeletedCallback();
        }.bind(this))
            .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
        // Load STL model
        var loaderSTL = new _stlLoader__WEBPACK_IMPORTED_MODULE_5__["default"]();
        loaderSTL.load('https://cdn.rawgit.com/FNNDSC/data/master/stl/adi_brain/WM.stl', function (geometry) {
            var material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({ color: 0xf44336, specular: 0x111111, shininess: 200 });
            var mesh = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](geometry, material);
            mesh.name = 'wm.stl';
            // to LPS space
            var rasToLPS = new three__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
            rasToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            mesh.applyMatrix(rasToLPS);
            this.objects.add(mesh);
        }.bind(this));
    };
    BrainvisCanvasComponent.prototype.addEventListeners = function () {
        var _this = this;
        this.controls.addEventListener('zoomstart', function (event) {
            var position = _this.controls.camera.position.toArray();
            var target = _this.controls.target.toArray();
            var up = _this.controls.camera.up.toArray();
            var orientation = { position: position, target: target, up: up };
            _this.dispatchEvent({
                type: 'zoomStart',
                orientation: orientation
            });
        });
        this.controls.addEventListener('zoomend', function (event) {
            var position = _this.controls.camera.position.toArray();
            var target = _this.controls.target.toArray();
            var up = _this.controls.camera.up.toArray();
            var orientation = { position: position, target: target, up: up };
            _this.dispatchEvent({
                type: 'zoomEnd',
                orientation: orientation
            });
        });
        this.controls.addEventListener('start', function (event) {
            var position = _this.controls.camera.position.toArray();
            var target = _this.controls.target.toArray();
            var up = _this.controls.camera.up.toArray();
            var orientation = { position: position, target: target, up: up };
            _this.dispatchEvent({
                type: 'cameraStart',
                orientation: orientation
            });
        });
        this.controls.addEventListener('end', function (event) {
            var position = _this.controls.camera.position.toArray();
            var target = _this.controls.target.toArray();
            var up = _this.controls.camera.up.toArray();
            var orientation = { position: position, target: target, up: up };
            _this.dispatchEvent({
                type: 'cameraEnd',
                orientation: orientation
            });
        });
        this.objectSelector.addEventListener('objectSelection', function (event) {
            _this.dispatchEvent(event);
        });
    };
    BrainvisCanvasComponent.prototype.setSize = function (width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.controls.handleResize();
    };
    BrainvisCanvasComponent.prototype.setInteractive = function (interactive) {
        this.controls.enabled = interactive;
        if (this.sliceManipulator) {
            this.sliceManipulator.enabled = interactive;
        }
        this.sliceCheckbox.disabled = !interactive;
        this.sliceHandleCheckbox.disabled = !interactive || !this.sliceCheckbox.checked;
        this.alignButton.disabled = !interactive || !this.sliceCheckbox.checked;
    };
    BrainvisCanvasComponent.prototype.setControlZoom = function (newOrientation, within) {
        this.controls.changeCamera(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]), within > 0 ? within : 1000);
    };
    BrainvisCanvasComponent.prototype.setControlOrientation = function (newOrientation, within) {
        this.controls.changeCamera(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.position[0], newOrientation.position[1], newOrientation.position[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.target[0], newOrientation.target[1], newOrientation.target[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](newOrientation.up[0], newOrientation.up[1], newOrientation.up[2]), within > 0 ? within : 1000);
    };
    BrainvisCanvasComponent.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    BrainvisCanvasComponent.prototype.setSlicePlanePosition = function (positions, within) {
        if (this.stackHelper) {
            this.sliceManipulator.changeSlicePosition(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](positions.position[0], positions.position[1], positions.position[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
        }
    };
    BrainvisCanvasComponent.prototype.toggleSlice = function (state) {
        if (this.stackHelper) {
            this.stackHelper._slice.visible = state;
            this.stackHelper._border.visible = state;
            // this.sliceHandleCheckbox.disabled = !state;
            // this.alignButton.disabled = !state;
            // this.sliceCheckbox.checked = state;
            if (state === false) {
                this.sliceManipulator.visible = state;
            }
            else {
                this.sliceManipulator.visible = this._showSlice;
            }
        }
    };
    BrainvisCanvasComponent.prototype.toggleSliceHandle = function (state) {
        if (this.sliceManipulator) {
            this.sliceManipulator.visible = state;
            // this.sliceHandleCheckbox.checked = state;
        }
    };
    BrainvisCanvasComponent.prototype.toggleObjects = function (visible) {
        this.objects.visible = visible;
        this.showObjectCheckbox.checked = visible;
    };
    BrainvisCanvasComponent.prototype.setSelection = function (newSelection) {
        this.objectSelector.setSelection(newSelection);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showSlice", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "onShowSlice", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showSliceHandle", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "onShowSliceHandle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showObjects", null);
    BrainvisCanvasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-brainvis-canvas',
            template: '',
            styles: [__webpack_require__(/*! ./brainvis-canvas.component.css */ "./src/app/brainvis-canvas/brainvis-canvas.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _provenance_service__WEBPACK_IMPORTED_MODULE_8__["ProvenanceService"]])
    ], BrainvisCanvasComponent);
    return BrainvisCanvasComponent;
}(three__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]));



/***/ }),

/***/ "./src/app/brainvis-canvas/intersectionManager.ts":
/*!********************************************************!*\
  !*** ./src/app/brainvis-canvas/intersectionManager.ts ***!
  \********************************************************/
/*! exports provided: StaticGeometryListener, IntersectionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticGeometryListener", function() { return StaticGeometryListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntersectionManager", function() { return IntersectionManager; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/*
Special class to manage intersection with goemtry.
Subsystems can register to be tested for intersections.
All subsytems gets mouse up/down/move messages but the substem with the closest hitpoint will get intersection information.
*/

var StaticGeometryListener = /** @class */ (function () {
    function StaticGeometryListener(object) {
        this.object = object;
    }
    StaticGeometryListener.prototype.onMouseDown = function (intersection, pointer) {
        //
    };
    StaticGeometryListener.prototype.onMouseUp = function (intersection, pointer) {
        //
    };
    StaticGeometryListener.prototype.onMouseMove = function (intersection, pointer) {
        //
    };
    StaticGeometryListener.prototype.getObjects = function () {
        return this.object.children;
    };
    StaticGeometryListener.prototype.isEnabled = function () {
        return this.object.visible;
    };
    return StaticGeometryListener;
}());

var IntersectionManager = /** @class */ (function () {
    function IntersectionManager(domElement, camera) {
        var _this = this;
        this.listeners = [];
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_0__["Raycaster"]();
        this.onMouseDown = function (event) {
            var intersection = _this.getClosestObject(event);
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (intersection[0] === listener) {
                    listener.onMouseDown(intersection[1], event);
                }
                else {
                    listener.onMouseDown(undefined, event);
                }
            }
        };
        this.onMouseMove = function (event) {
            var intersection = _this.getClosestObject(event);
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (intersection[0] === listener) {
                    listener.onMouseMove(intersection[1], event);
                }
                else {
                    listener.onMouseMove(undefined, event);
                }
            }
        };
        this.onMouseUp = function (event) {
            var intersection = _this.getClosestObject(event);
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (intersection[0] === listener) {
                    listener.onMouseUp(intersection[1], event);
                }
                else {
                    listener.onMouseUp(undefined, event);
                }
            }
        };
        this.camera = camera;
        this.domElement = domElement;
        domElement.addEventListener('mousemove', this.onMouseMove, false);
        domElement.addEventListener('mousedown', this.onMouseDown, false);
        domElement.addEventListener('mouseup', this.onMouseUp, false);
    }
    IntersectionManager.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    IntersectionManager.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    };
    IntersectionManager.prototype.setUpRaycaster = function (pointer) {
        var rect = this.domElement.getBoundingClientRect();
        var x = (pointer.clientX - rect.left) / rect.width;
        var y = (pointer.clientY - rect.top) / rect.height;
        var pointerVector = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]((x * 2) - 1, -(y * 2) + 1);
        this.raycaster.setFromCamera(pointerVector, this.camera);
    };
    IntersectionManager.prototype.intersectObjects = function (pointer, objects) {
        this.setUpRaycaster(pointer);
        var intersections = this.raycaster.intersectObjects(objects, true);
        return intersections[0] ? intersections[0] : false;
    };
    IntersectionManager.prototype.getClosestObject = function (event) {
        this.setUpRaycaster(event);
        var closestListener;
        var closestIntersection;
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            if (listener.isEnabled()) {
                var intersection = this.intersectObjects(event, listener.getObjects());
                if (intersection !== false) {
                    if (closestIntersection === undefined || (intersection.distance < closestIntersection.distance)) {
                        closestIntersection = intersection;
                        closestListener = listener;
                    }
                }
            }
        }
        return [closestListener, closestIntersection];
    };
    return IntersectionManager;
}());



/***/ }),

/***/ "./src/app/brainvis-canvas/objectSelector.ts":
/*!***************************************************!*\
  !*** ./src/app/brainvis-canvas/objectSelector.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ObjectSelector = /** @class */ (function (_super) {
    __extends(ObjectSelector, _super);
    function ObjectSelector(objects) {
        var _this = _super.call(this) || this;
        _this.objects = objects;
        return _this;
    }
    ObjectSelector.prototype.onMouseDown = function (intersection, pointer) {
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (intersection !== undefined && this.previosSelectedObject !== intersection.object && intersection.object instanceof three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]) {
            var asMesh = intersection.object;
            if (asMesh.material instanceof three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]) {
                var previousName = '';
                if (this.previosSelectedObject) {
                    var asMeshPongMaterial_1 = this.previosSelectedObject.material;
                    asMeshPongMaterial_1.color.setHex(this.previousColor);
                    previousName = this.previosSelectedObject.name;
                }
                var asMeshPongMaterial = asMesh.material;
                this.previosSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
                this.dispatchEvent({
                    type: 'objectSelection',
                    newObjectName: asMesh.name,
                    previousObjectName: previousName
                });
            }
        }
        else if (this.previosSelectedObject) {
            var asMeshPongMaterial = this.previosSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.dispatchEvent({
                type: 'objectSelection',
                newObjectName: '',
                previousObjectName: this.previosSelectedObject.name
            });
            this.previosSelectedObject = undefined;
        }
    };
    ObjectSelector.prototype.onMouseUp = function (intersection, pointer) {
        //
    };
    ObjectSelector.prototype.onMouseMove = function (intersection, pointer) {
        //
    };
    ObjectSelector.prototype.getObjects = function () {
        return this.objects.children;
    };
    ObjectSelector.prototype.isEnabled = function () {
        return this.objects.visible;
    };
    ObjectSelector.prototype.setSelection = function (newSelection) {
        var objectToSelect = undefined;
        for (var _i = 0, _a = this.objects.children; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.name === newSelection) {
                objectToSelect = object;
                break;
            }
        }
        if (this.previosSelectedObject) {
            var asMeshPongMaterial = this.previosSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.previosSelectedObject = undefined;
        }
        if (objectToSelect) {
            var asMesh = objectToSelect;
            if (asMesh.material instanceof three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]) {
                var asMeshPongMaterial = asMesh.material;
                this.previosSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
            }
        }
    };
    return ObjectSelector;
}(three__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (ObjectSelector);


/***/ }),

/***/ "./src/app/brainvis-canvas/provenanceActions.ts":
/*!******************************************************!*\
  !*** ./src/app/brainvis-canvas/provenanceActions.ts ***!
  \******************************************************/
/*! exports provided: registerActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerActions", function() { return registerActions; });
var getActions = function (canvas) { return ({
    setControlZoom: function (args) { return Promise.resolve(canvas.setControlZoom(args, 500)); },
    setSlicePlaneOrientation: function (position, direction) { return Promise.resolve(canvas.setSlicePlanePosition({ position: position, direction: direction }, 500)); },
    showSlice: function (value) { return Promise.resolve(canvas.showSlice = value); },
    showSliceHandle: function (value) { return Promise.resolve(canvas.showSliceHandle = value); },
}); };
var registerActions = function (registry, canvas) {
    var actions = getActions(canvas);
    Object.keys(actions).forEach(function (actionName) {
        registry.register(actionName, actions[actionName]);
    });
};


/***/ }),

/***/ "./src/app/brainvis-canvas/provenanceListeners.ts":
/*!********************************************************!*\
  !*** ./src/app/brainvis-canvas/provenanceListeners.ts ***!
  \********************************************************/
/*! exports provided: addListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListeners", function() { return addListeners; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var addListeners = function (tracker, canvas) {
    canvas.addEventListener('cameraStart', function (startEvent) {
        var cameraEndListener = function (event) {
            tracker.applyAction({
                do: 'setControlZoom',
                doArguments: [event.orientation],
                undo: 'setControlZoom',
                undoArguments: [startEvent.orientation],
            });
            canvas.removeEventListener('cameraEnd', cameraEndListener);
        };
        canvas.addEventListener('cameraEnd', cameraEndListener);
    });
    var zoomEndListener = null;
    var zoomStartListener = function (startEvent) {
        canvas.removeEventListener('zoomEnd', zoomEndListener);
        zoomEndListener = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["debounce"])(function (event) {
            tracker.applyAction({
                do: 'setControlZoom',
                doArguments: [event.orientation],
                undo: 'setControlZoom',
                undoArguments: [startEvent.orientation],
            }, true);
        }, 500, { trailing: true });
        canvas.addEventListener('zoomEnd', zoomEndListener);
    };
    canvas.addEventListener('zoomStart', Object(lodash__WEBPACK_IMPORTED_MODULE_0__["debounce"])(zoomStartListener, 500, { leading: true }));
    canvas.addEventListener('sliceOrientationChanged', function (event) {
        var _a = event.changes, position = _a.position, direction = _a.direction, oldPosition = _a.oldPosition, oldDirection = _a.oldDirection;
        console.log(position, direction, oldPosition, oldDirection);
        tracker.applyAction({
            do: 'setSlicePlaneOrientation',
            doArguments: [position, direction],
            undo: 'setSlicePlaneOrientation',
            undoArguments: [oldPosition, oldDirection],
        });
    });
    canvas.onShowSlice.subscribe(function (val) {
        tracker.applyAction({
            do: 'showSlice',
            doArguments: [val],
            undo: 'showSlice',
            undoArguments: [!val],
        }, true);
    });
    canvas.onShowSliceHandle.subscribe(function (val) {
        tracker.applyAction({
            do: 'showSliceHandle',
            doArguments: [val],
            undo: 'showSliceHandle',
            undoArguments: [!val],
        }, true);
    });
    // canvas.addEventListener('sliceZoomChanged', console.log);
    // canvas.addEventListener('sliceVisibilityChanged', console.log);
    // canvas.addEventListener('sliceHandleVisibilityChanged', console.log);
    // canvas.addEventListener('sliceModeChanged', console.log);
    // canvas.addEventListener('objectsVisibilityChanged', console.log);
    // canvas.addEventListener('objectSelection', console.log);
    // canvas.addEventListener('sliceZoomChanged', console.log);
};


/***/ }),

/***/ "./src/app/brainvis-canvas/sliceManipulatorWidget.ts":
/*!***********************************************************!*\
  !*** ./src/app/brainvis-canvas/sliceManipulatorWidget.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/**
 * Original author: Pjotr Svetachov
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SliceManipulatorWidget = /** @class */ (function (_super) {
    __extends(SliceManipulatorWidget, _super);
    function SliceManipulatorWidget(stackHelper, domElement, camera) {
        var _this = _super.call(this) || this;
        _this.plane = new three__WEBPACK_IMPORTED_MODULE_0__["Plane"]();
        _this.raycaster = new three__WEBPACK_IMPORTED_MODULE_0__["Raycaster"]();
        _this.startIntersection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        _this.isDragging = false;
        _this.changeTimeout = undefined;
        _this.enabled = true;
        _this.stackHelper = stackHelper;
        _this.domElement = domElement;
        _this.camera = camera;
        _this.visible = true;
        // ray casting stuff
        _this.originalSlicePosition = stackHelper.slice.planeDirection.clone();
        // make the geometry
        stackHelper.slice.updateMatrixWorld();
        var endPosition = stackHelper.slice.planeDirection.clone();
        endPosition.multiplyScalar(80.0);
        endPosition.add(stackHelper.slice.planePosition);
        var middlePosition = stackHelper.slice.planeDirection.clone();
        middlePosition.multiplyScalar(40.0);
        middlePosition.add(stackHelper.slice.planePosition);
        // line
        var geometryCylinder = new three__WEBPACK_IMPORTED_MODULE_0__["CylinderGeometry"](1.5, 1.5, 40, 8);
        var material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ color: 0xffffff });
        _this.cylinder = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometryCylinder, material);
        _this.cylinder.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        _this.cylinder.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0), stackHelper.slice.planeDirection);
        _this.add(_this.cylinder);
        var arrow = new three__WEBPACK_IMPORTED_MODULE_0__["ConeBufferGeometry"](3.5, 10);
        _this.arrowUp = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](arrow, material);
        _this.arrowUp.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        _this.arrowUp.position.addScaledVector(stackHelper.slice.planeDirection, 25);
        _this.arrowUp.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0), stackHelper.slice.planeDirection);
        _this.add(_this.arrowUp);
        _this.arrowDown = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](arrow, material);
        _this.arrowDown.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        _this.arrowDown.position.addScaledVector(stackHelper.slice.planeDirection, -25);
        _this.arrowDown.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, -1, 0), stackHelper.slice.planeDirection);
        _this.add(_this.arrowDown);
        var materialLine = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]();
        _this.geometryLine = new three__WEBPACK_IMPORTED_MODULE_0__["Geometry"]();
        _this.geometryLine.vertices.push(stackHelper.slice.planePosition.clone());
        _this.geometryLine.vertices.push(endPosition);
        _this.geometryLine.verticesNeedUpdate = true;
        _this.line = new three__WEBPACK_IMPORTED_MODULE_0__["Line"](_this.geometryLine, materialLine);
        _this.add(_this.line);
        // sphre
        var geometrySphere = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](5, 32, 32);
        material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ color: 0xffff00 });
        _this.sphere = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometrySphere, material);
        _this.sphere.position.copy(endPosition);
        _this.add(_this.sphere);
        return _this;
    }
    SliceManipulatorWidget.prototype.onMouseDown = function (intersection, pointer) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (this.previousSelection) {
            this.previousSelection.material.color.set(0x00ff00);
            this.oldPosition = this.stackHelper.slice.planePosition.clone();
            this.oldDirection = this.stackHelper.slice.planeDirection.clone();
            this.isDragging = true;
            this.setUpRaycaster(pointer);
            this.originalSlicePosition = this.stackHelper.slice.planePosition.clone();
            this.raycaster.ray.intersectPlane(this.plane, this.startIntersection);
        }
    };
    ;
    SliceManipulatorWidget.prototype.onMouseUp = function (intersection, pointer) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (this.previousSelection && this.isDragging) {
            event.stopImmediatePropagation();
            this.previousSelection.material.color.set(0xff0000);
            this.isDragging = false;
            if (this.previousSelection === this.line) {
                this.dispatchEvent({
                    type: 'zoomChange',
                    position: this.stackHelper.slice.planePosition.clone(),
                    direction: this.stackHelper.slice.planeDirection.clone(),
                    oldPosition: this.oldPosition,
                    oldDirection: this.oldDirection
                });
            }
            else {
                this.dispatchEvent({
                    type: 'orientationChange',
                    position: this.stackHelper.slice.planePosition.clone(),
                    direction: this.stackHelper.slice.planeDirection.clone(),
                    oldPosition: this.oldPosition,
                    oldDirection: this.oldDirection
                });
            }
        }
    };
    ;
    SliceManipulatorWidget.prototype.onMouseMove = function (intersection, pointer) {
        if (!this.visible || !this.enabled) {
            return;
        }
        if (intersection !== undefined) {
            event.stopImmediatePropagation();
        }
        if (!this.isDragging) {
            if (intersection === undefined) {
                this.clearSelection();
                return;
            }
            if (intersection.object !== this.line) {
                this.highLightObject(intersection.object, 0xff0000);
            }
            // move intersection plane to intersection location
            this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), intersection.object.position);
        }
        else {
            this.setUpRaycaster(event);
            var intersectionPoint = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
            this.raycaster.ray.intersectPlane(this.plane, intersectionPoint);
            var intersectionDirection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
            intersectionDirection.copy(intersectionPoint).sub(this.startIntersection);
            var distance = intersectionDirection.dot(this.stackHelper.slice.planeDirection);
            event.stopImmediatePropagation();
            // move the slice
            if (this.previousSelection === this.line || this.previousSelection === this.cylinder
                || this.previousSelection === this.arrowUp || this.previousSelection === this.arrowDown) {
                var offset = this.stackHelper.slice.planeDirection.clone();
                offset.multiplyScalar(distance);
                offset.add(this.originalSlicePosition);
                // we need to find the position where the stack intersects the bounding box
                // push the start of the ray a little back this helps with cases where ray
                // starts at the edge of the volume and does not intersect it at all
                var beginOffset = this.originalSlicePosition.clone();
                beginOffset.sub(offset);
                var interSetionPoint = this.intersectStackHelper(beginOffset, offset);
                this.stackHelper.slice.planePosition.copy(interSetionPoint);
            }
            else if (this.previousSelection === this.sphere) {
                var direction = intersectionPoint.clone();
                direction.sub(this.stackHelper.slice.planePosition);
                this.stackHelper.slice.planeDirection.copy(direction);
                this.stackHelper.slice.planeDirection.normalize();
            }
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            this.updateWidget();
        }
    };
    ;
    SliceManipulatorWidget.prototype.getObjects = function () {
        return this.children;
    };
    SliceManipulatorWidget.prototype.isEnabled = function () {
        return this.visible;
    };
    SliceManipulatorWidget.prototype.updateWidget = function () {
        // update line
        this.geometryLine.vertices[0] = this.stackHelper.slice.planePosition.clone();
        // update arrow
        var middlePosition = this.stackHelper.slice.planeDirection.clone();
        middlePosition.multiplyScalar(40.0);
        middlePosition.add(this.stackHelper.slice.planePosition);
        this.cylinder.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.cylinder.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0), this.stackHelper.slice.planeDirection);
        this.arrowUp.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowUp.position.addScaledVector(this.stackHelper.slice.planeDirection, 25);
        this.arrowUp.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 0), this.stackHelper.slice.planeDirection);
        this.arrowDown.position.set(middlePosition.x, middlePosition.y, middlePosition.z);
        this.arrowDown.position.addScaledVector(this.stackHelper.slice.planeDirection, -25);
        this.arrowDown.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, -1, 0), this.stackHelper.slice.planeDirection);
        var endPosition = this.stackHelper.slice.planeDirection.clone();
        endPosition.multiplyScalar(80.0);
        endPosition.add(this.stackHelper.slice.planePosition);
        this.geometryLine.vertices[1] = endPosition;
        this.geometryLine.verticesNeedUpdate = true;
        this.geometryLine.computeBoundingBox();
        this.geometryLine.computeBoundingSphere();
        // update sphere
        this.sphere.position.copy(endPosition);
    };
    // highlight a object and returns previous highlighted object to original color
    SliceManipulatorWidget.prototype.highLightObject = function (newObject, newColor) {
        // store object previous color if we haven't done so
        if (this.previousSelection !== newObject) {
            if (this.previousSelection) {
                this.previousSelection.material.color = this.previousSelection.previousColor.clone();
            }
            this.previousSelection = newObject;
        }
        if (!newObject.previousColor) {
            newObject.previousColor = newObject.material.color.clone();
        }
        newObject.material.color.set(newColor);
    };
    SliceManipulatorWidget.prototype.clearSelection = function () {
        if (this.previousSelection) {
            this.previousSelection.material.color = this.previousSelection.previousColor.clone();
        }
        this.previousSelection = null;
    };
    SliceManipulatorWidget.prototype.setUpRaycaster = function (pointer) {
        var rect = this.domElement.getBoundingClientRect();
        var x = (pointer.clientX - rect.left) / rect.width;
        var y = (pointer.clientY - rect.top) / rect.height;
        var pointerVector = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]((x * 2) - 1, -(y * 2) + 1);
        this.raycaster.setFromCamera(pointerVector, this.camera);
    };
    // gives intersection with the inside of the bounding box
    // of the bounding box
    SliceManipulatorWidget.prototype.intersectStackHelper = function (beginpoint, endpoint) {
        var direction = endpoint.clone();
        direction.sub(beginpoint);
        var length = direction.length();
        direction.normalize();
        this.raycaster.set(beginpoint, direction);
        // ray cast against bouding box
        var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["Object3D"]();
        var mesh = this.stackHelper.children[0]._meshStack.clone();
        mesh.material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
            wireframe: false,
            side: three__WEBPACK_IMPORTED_MODULE_0__["BackSide"],
        });
        geometry.add(mesh);
        var intersections = this.raycaster.intersectObjects(geometry.children, true);
        if (intersections[0] && intersections[0].distance <= length) {
            return intersections[0].point;
        }
        else {
            return endpoint;
        }
    };
    SliceManipulatorWidget.prototype.finishCurrentTransition = function () {
        if (this.changeTimeout !== undefined) {
            clearInterval(this.changeTimeout);
            this.changeTimeout = undefined;
            this.changeSlicePosition(this.toPosition, this.toDirection, 0);
        }
    };
    /**
     * Changes the slice to a new position
     * @param newPosition new position of the slice
     * @param newDirection of the slice
     * @param milliseconds transition time
     */
    SliceManipulatorWidget.prototype.changeSlicePosition = function (newPosition, newDirection, milliseconds) {
        var _this = this;
        if (this.stackHelper.slice.planePosition.equals(newPosition) && this.stackHelper.slice.planeDirection.equals(newDirection)) {
            return;
        }
        if (milliseconds <= 0) {
            this.stackHelper.slice.planePosition.copy(newPosition);
            this.stackHelper.slice.planeDirection.copy(newDirection);
            this.stackHelper.slice._update();
            this.stackHelper.border.helpersSlice = this.stackHelper.slice;
            this.updateWidget();
        }
        else {
            //cancel previous animation
            if (this.changeTimeout !== undefined) {
                clearInterval(this.changeTimeout);
                this.changeTimeout = undefined;
            }
            var changeTime_1 = 0;
            var delta_1 = 30 / milliseconds;
            this.toPosition = newPosition;
            this.toDirection = newDirection;
            this.changeTimeout = setInterval(function (fromPosition, fromDirection, toPosition, toDirection) {
                _this.enabled = false;
                var t = changeTime_1;
                var interPolateTime = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in/out function
                var nextPosition = fromPosition.clone();
                var distancePosition = toPosition.clone();
                distancePosition.sub(fromPosition);
                nextPosition.addScaledVector(distancePosition, interPolateTime);
                var nextDirection = fromDirection.clone();
                var distanceUp = toDirection.clone();
                distanceUp.sub(fromDirection);
                nextDirection.addScaledVector(distanceUp, interPolateTime);
                nextDirection.normalize();
                _this.changeSlicePosition(nextPosition, nextDirection, 0);
                changeTime_1 += delta_1;
                if (changeTime_1 > 1.0) {
                    _this.changeSlicePosition(toPosition, toDirection, 0);
                    clearInterval(_this.changeTimeout);
                    _this.changeTimeout = undefined;
                    _this.enabled = true;
                }
            }, 30, this.stackHelper.slice.planePosition, this.stackHelper.slice.planeDirection, newPosition, newDirection);
        }
    };
    ;
    return SliceManipulatorWidget;
}(three__WEBPACK_IMPORTED_MODULE_0__["Object3D"]));
/* harmony default export */ __webpack_exports__["default"] = (SliceManipulatorWidget);


/***/ }),

/***/ "./src/app/brainvis-canvas/stlLoader.ts":
/*!**********************************************!*\
  !*** ./src/app/brainvis-canvas/stlLoader.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/**
 * STL loader converted to TypeScript. Original authors:
 * @author aleeper / http://adamleeper.com/
 * @author mrdoob / http://mrdoob.com/
 * @author gero3 / https://github.com/gero3
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 *  Binary decoding supports "Magics" color format (http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
 *  There is perhaps some question as to how valid it is to always assume little-endian-ness.
 *  ASCII decoding assumes file is UTF-8.
 *
 * Usage:
 *  let loader = new THREE.STLLoader();
 *  loader.load( './models/stl/slotted_disk.stl', function ( geometry ) {
 *    scene.add( new THREE.Mesh( geometry ) );
 *  });
 *
 * For binary STLs geometry might contain colors for vertices. To use it:
 *  // use the same code to load STL as above
 *  if (geometry.hasColors) {
 *    material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
 *  } else { .... }
 *  let mesh = new THREE.Mesh( geometry, material );
 */
// tslint:disable

var STLLoader = /** @class */ (function () {
    function STLLoader(manager) {
        this.manager = (manager !== undefined) ? manager : three__WEBPACK_IMPORTED_MODULE_0__["DefaultLoadingManager"];
    }
    STLLoader.prototype.load = function (url, onLoad, onProgress, onError) {
        var scope = this;
        var loader = new three__WEBPACK_IMPORTED_MODULE_0__["FileLoader"](scope.manager);
        loader.setResponseType('arraybuffer');
        loader.load(url, function (text) {
            try {
                onLoad(scope.parse(text));
            }
            catch (exception) {
                if (onError) {
                    onError(exception);
                }
            }
        }, onProgress, onError);
    };
    STLLoader.prototype.parseBinary = function (data) {
        var reader = new DataView(data);
        var faces = reader.getUint32(80, true);
        var r, g, b, hasColors = false, colors;
        var defaultR, defaultG, defaultB, alpha;
        // process STL header
        // check for default color in header ("COLOR=rgba" sequence).
        for (var index = 0; index < 80 - 10; index++) {
            if ((reader.getUint32(index, false) === 0x434F4C4F /*COLO*/) &&
                (reader.getUint8(index + 4) === 0x52 /*'R'*/) &&
                (reader.getUint8(index + 5) === 0x3D /*'='*/)) {
                hasColors = true;
                colors = [];
                defaultR = reader.getUint8(index + 6) / 255;
                defaultG = reader.getUint8(index + 7) / 255;
                defaultB = reader.getUint8(index + 8) / 255;
                alpha = reader.getUint8(index + 9) / 255;
            }
        }
        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;
        var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();
        var vertices = [];
        var normals = [];
        for (var face = 0; face < faces; face++) {
            var start = dataOffset + face * faceLength;
            var normalX = reader.getFloat32(start, true);
            var normalY = reader.getFloat32(start + 4, true);
            var normalZ = reader.getFloat32(start + 8, true);
            if (hasColors) {
                var packedColor = reader.getUint16(start + 48, true);
                if ((packedColor & 0x8000) === 0) {
                    // facet has its own unique color
                    r = (packedColor & 0x1F) / 31;
                    g = ((packedColor >> 5) & 0x1F) / 31;
                    b = ((packedColor >> 10) & 0x1F) / 31;
                }
                else {
                    r = defaultR;
                    g = defaultG;
                    b = defaultB;
                }
            }
            for (var i = 1; i <= 3; i++) {
                var vertexstart = start + i * 12;
                vertices.push(reader.getFloat32(vertexstart, true));
                vertices.push(reader.getFloat32(vertexstart + 4, true));
                vertices.push(reader.getFloat32(vertexstart + 8, true));
                normals.push(normalX, normalY, normalZ);
                if (hasColors) {
                    colors.push(r, g, b);
                }
            }
        }
        geometry.addAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__["BufferAttribute"](new Float32Array(vertices), 3));
        geometry.addAttribute('normal', new three__WEBPACK_IMPORTED_MODULE_0__["BufferAttribute"](new Float32Array(normals), 3));
        if (hasColors) {
            geometry.addAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__["BufferAttribute"](new Float32Array(colors), 3));
            geometry.hasColors = true;
            geometry.alpha = alpha;
        }
        return geometry;
    };
    STLLoader.prototype.parse = function (data) {
        function isBinary(data) {
            var expect, faceSize, nFaces, reader;
            reader = new DataView(data);
            faceSize = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
            nFaces = reader.getUint32(80, true);
            expect = 80 + (32 / 8) + (nFaces * faceSize);
            if (expect === reader.byteLength) {
                return true;
            }
            // An ASCII STL data must begin with 'solid ' as the first six bytes.
            // However, ASCII STLs lacking the SPACE after the 'd' are known to be
            // plentiful.  So, check the first 5 bytes for 'solid'.
            // US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'
            var solid = [115, 111, 108, 105, 100];
            for (var i = 0; i < 5; i++) {
                // If solid[ i ] does not match the i-th byte, then it is not an
                // ASCII STL; hence, it is binary and return true.
                if (solid[i] !== reader.getUint8(i, false)) {
                    return true;
                }
            }
            // First 5 bytes read "solid"; declare it to be an ASCII STL
            return false;
        }
        function parseASCII(data) {
            var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();
            var patternFace = /facet([\s\S]*?)endfacet/g;
            var faceCounter = 0;
            var patternFloat = /[\s]+([+-]?(?:\d+.\d+|\d+.|\d+|.\d+)(?:[eE][+-]?\d+)?)/.source;
            var patternVertex = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g');
            var patternNormal = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g');
            var vertices = [];
            var normals = [];
            var normal = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
            var result;
            while ((result = patternFace.exec(data)) !== null) {
                var vertexCountPerFace = 0;
                var normalCountPerFace = 0;
                var text = result[0];
                while ((result = patternNormal.exec(text)) !== null) {
                    normal.x = parseFloat(result[1]);
                    normal.y = parseFloat(result[2]);
                    normal.z = parseFloat(result[3]);
                    normalCountPerFace++;
                }
                while ((result = patternVertex.exec(text)) !== null) {
                    vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                    normals.push(normal.x, normal.y, normal.z);
                    vertexCountPerFace++;
                }
                // every face have to own ONE valid normal
                if (normalCountPerFace !== 1) {
                    console.error('THREE.STLLoader: Something isn\'t right with the normal of face number ' + faceCounter);
                }
                // each face have to own THREE valid vertices
                if (vertexCountPerFace !== 3) {
                    console.error('THREE.STLLoader: Something isn\'t right with the vertices of face number ' + faceCounter);
                }
                faceCounter++;
            }
            geometry.addAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](vertices, 3));
            geometry.addAttribute('normal', new three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](normals, 3));
            return geometry;
        }
        function ensureString(buffer) {
            if (typeof buffer !== 'string') {
                var arrayBuffer = new Uint8Array(buffer);
                var str = '';
                var il = buffer.byteLength;
                for (var i = 0; i < il; i++) {
                    str += String.fromCharCode(arrayBuffer[i]); // implicitly assumes little-endian
                }
                return str;
            }
            else {
                return buffer;
            }
        }
        function ensureBinary(buffer) {
            if (typeof buffer === 'string') {
                var arrayBuffer = new Uint8Array(buffer.length);
                for (var i = 0; i < buffer.length; i++) {
                    arrayBuffer[i] = buffer.charCodeAt(i) & 0xff; // implicitly assumes little-endian
                }
                return arrayBuffer.buffer || arrayBuffer;
            }
            else {
                return buffer;
            }
        }
        // start
        var binData = ensureBinary(data);
        return isBinary(binData) ? this.parseBinary(binData) : parseASCII(ensureString(data));
    };
    return STLLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (STLLoader);


/***/ }),

/***/ "./src/app/brainvis-canvas/trackball.ts":
/*!**********************************************!*\
  !*** ./src/app/brainvis-canvas/trackball.ts ***!
  \**********************************************/
/*! exports provided: STATE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATE", function() { return STATE; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/**
 * Original authors from THREEJS repo
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * Original file is from the AMI library (but I think they got it from Three.js)
 * Modified for the Visual Storytelling project to be able to get and save state
 * and to allow for smooth tansitions
 */

var STATE;
(function (STATE) {
    STATE[STATE["NONE"] = -1] = "NONE";
    STATE[STATE["ROTATE"] = 0] = "ROTATE";
    STATE[STATE["ZOOM"] = 1] = "ZOOM";
    STATE[STATE["PAN"] = 2] = "PAN";
    STATE[STATE["TOUCH_ROTATE"] = 3] = "TOUCH_ROTATE";
    STATE[STATE["TOUCH_ZOOM"] = 4] = "TOUCH_ZOOM";
    STATE[STATE["TOUCH_PAN"] = 5] = "TOUCH_PAN";
    STATE[STATE["CUSTOM"] = 99] = "CUSTOM";
})(STATE || (STATE = {}));
var Trackball = /** @class */ (function (_super) {
    __extends(Trackball, _super);
    function Trackball(object, domElement) {
        var _this = _super.call(this) || this;
        _this.state = STATE.NONE;
        _this.previousState = STATE.NONE;
        _this.screen = { left: 0, top: 0, width: 0, height: 0 };
        _this.enabled = true;
        _this.rotateSpeed = 1.0;
        _this.zoomSpeed = 1.2;
        _this.panSpeed = 0.3;
        _this.noRotate = false;
        _this.noZoom = false;
        _this.noPan = false;
        _this.noCustom = false;
        _this.forceState = -1;
        _this.staticMoving = false;
        _this.dynamicDampingFactor = 0.2;
        _this.minDistance = 0;
        _this.maxDistance = Infinity;
        _this.keys = [65 /* A*/, 83 /* S*/, 68];
        // internals
        _this.target = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        _this.lastPosition = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        _this.EPS = 0.000001;
        _this.eye = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        _this.movePrev = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.moveCurr = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.lastAxis = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
        _this.lastAngle = 0;
        _this.zoomStart = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.zoomEnd = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.touchZoomDistanceStart = 0;
        _this.touchZoomDistanceEnd = 0;
        _this.panStart = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.panEnd = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.customStart = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.customEnd = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        _this.changeTimeout = undefined;
        _this.changeTime = 0.0;
        _this.isDragging = false;
        _this.rotateCamera = (function () {
            var axis = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), quaternion = new three__WEBPACK_IMPORTED_MODULE_0__["Quaternion"](), eyeDirection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), objectUpDirection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), objectSidewaysDirection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), moveDirection = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
            return function () {
                moveDirection.set(this.moveCurr.x - this.movePrev.x, this.moveCurr.y - this.movePrev.y, 0);
                var angle = moveDirection.length();
                if (angle) {
                    this.eye.copy(this.camera.position).sub(this.target);
                    eyeDirection.copy(this.eye).normalize();
                    objectUpDirection.copy(this.camera.up).normalize();
                    objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();
                    objectUpDirection.setLength(this.moveCurr.y - this.movePrev.y);
                    objectSidewaysDirection.setLength(this.moveCurr.x - this.movePrev.x);
                    moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));
                    axis.crossVectors(moveDirection, this.eye).normalize();
                    angle *= this.rotateSpeed;
                    quaternion.setFromAxisAngle(axis, angle);
                    this.eye.applyQuaternion(quaternion);
                    this.camera.up.applyQuaternion(quaternion);
                    this.lastAxis.copy(axis);
                    this.lastAngle = angle;
                }
                else if (!this.staticMoving && this.lastAngle) {
                    this.lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
                    this.eye.copy(this.camera.position).sub(this.target);
                    quaternion.setFromAxisAngle(this.lastAxis, this.lastAngle);
                    this.eye.applyQuaternion(quaternion);
                    this.camera.up.applyQuaternion(quaternion);
                }
                this.movePrev.copy(this.moveCurr);
            };
        }());
        _this.zoomCamera = function () {
            var factor;
            if (this.state === STATE.TOUCH_ZOOM) {
                factor = this.touchZoomDistanceStart / this.touchZoomDistanceEnd;
                this.touchZoomDistanceStart = this.touchZoomDistanceEnd;
                this.eye.multiplyScalar(factor);
            }
            else {
                factor = 1.0 + (this.zoomEnd.y - this.zoomStart.y) * this.zoomSpeed;
                if (factor !== 1.0 && factor > 0.0) {
                    this.eye.multiplyScalar(factor);
                    if (this.staticMoving) {
                        this.zoomStart.copy(this.zoomEnd);
                    }
                    else {
                        this.zoomStart.y += (this.zoomEnd.y - this.zoomStart.y) * this.dynamicDampingFactor;
                    }
                }
            }
        };
        _this.panCamera = (function () {
            var mouseChange = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](), objectUp = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"](), pan = new three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
            return function () {
                mouseChange.copy(this.panEnd).sub(this.panStart);
                if (mouseChange.lengthSq()) {
                    mouseChange.multiplyScalar(this.eye.length() * this.panSpeed);
                    pan.copy(this.eye).cross(this.camera.up).setLength(mouseChange.x);
                    pan.add(objectUp.copy(this.camera.up).setLength(mouseChange.y));
                    this.camera.position.add(pan);
                    this.target.add(pan);
                    if (this.staticMoving) {
                        this.panStart.copy(this.panEnd);
                    }
                    else {
                        this.panStart.add(mouseChange.subVectors(this.panEnd, this.panStart).multiplyScalar(this.dynamicDampingFactor));
                    }
                }
            };
        }());
        _this.mousedown = function (event) {
            if (_this.enabled === false) {
                return;
            }
            _this.isDragging = true;
            event.preventDefault();
            event.stopPropagation();
            if (_this.state === STATE.NONE) {
                _this.state = event.button;
            }
            if (_this.state === STATE.ROTATE && !_this.noRotate) {
                _this.moveCurr.copy(_this.getMouseOnCircle(event.pageX, event.pageY));
                _this.movePrev.copy(_this.moveCurr);
            }
            else if (_this.state === STATE.ZOOM && !_this.noZoom) {
                _this.zoomStart.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
                _this.zoomEnd.copy(_this.zoomStart);
            }
            else if (_this.state === STATE.PAN && !_this.noPan) {
                _this.panStart.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
                _this.panEnd.copy(_this.panStart);
            }
            else if (_this.state === STATE.CUSTOM && !_this.noCustom) {
                _this.customStart.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
                _this.customEnd.copy(_this.panStart);
            }
            _this.dispatchEvent({ type: 'start' });
        };
        _this.mousemove = function (event) {
            if (_this.enabled === false || !_this.isDragging) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (_this.state === STATE.ROTATE && !_this.noRotate) {
                _this.movePrev.copy(_this.moveCurr);
                _this.moveCurr.copy(_this.getMouseOnCircle(event.pageX, event.pageY));
            }
            else if (_this.state === STATE.ZOOM && !_this.noZoom) {
                _this.zoomEnd.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
            }
            else if (_this.state === STATE.PAN && !_this.noPan) {
                _this.panEnd.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
            }
            else if (_this.state === STATE.CUSTOM && !_this.noCustom) {
                _this.customEnd.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
            }
        };
        _this.mouseup = function (event) {
            if (_this.enabled === false || !_this.isDragging) {
                return;
            }
            _this.isDragging = false;
            event.preventDefault();
            event.stopPropagation();
            var previousState = _this.state;
            if (_this.forceState === -1) {
                _this.state = STATE.NONE;
            }
            _this.dispatchEvent({ type: 'end', state: previousState, newTarget: _this.target, newPosition: _this.camera.position, newUp: _this.camera.up });
        };
        _this.mousewheel = function (event) {
            if (_this.enabled === false) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            var delta = 0;
            if (event.wheelDelta) {
                // WebKit / Opera / Explorer 9
                delta = event.wheelDelta / 40;
            }
            else if (event.detail) {
                // Firefox
                delta = -event.detail / 3;
            }
            if (_this.state !== STATE.CUSTOM) {
                _this.zoomStart.y += delta * 0.01;
            }
            else if (_this.state === STATE.CUSTOM) {
                _this.customStart.y += delta * 0.01;
            }
            _this.dispatchEvent({ type: 'zoomstart' });
            _this.dispatchEvent({ type: 'zoomend', state: STATE.ZOOM, newTarget: _this.target, newPosition: _this.target, newUp: _this.target });
        };
        _this.camera = object;
        _this.domElement = (domElement !== undefined) ? domElement : document;
        // for reset
        _this.target0 = _this.target.clone();
        _this.position0 = _this.camera.position.clone();
        _this.up0 = _this.camera.up.clone();
        _this.domElement.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        }, false);
        _this.handleResize();
        // force an update at start
        _this.update();
        return _this;
    }
    Trackball.prototype.initEventListeners = function () {
        this.domElement.addEventListener('mousedown', this.mousedown, false);
        document.addEventListener('mousemove', this.mousemove, false);
        document.addEventListener('mouseup', this.mouseup, false);
        this.domElement.addEventListener('mousewheel', this.mousewheel, false);
        this.domElement.addEventListener('DOMMouseScroll', this.mousewheel, false); // firefox
        this.domElement.addEventListener('touchstart', this.touchstart, false);
        this.domElement.addEventListener('touchend', this.touchend, false);
        this.domElement.addEventListener('touchmove', this.touchmove, false);
        window.addEventListener('keydown', this.keydown, false);
        window.addEventListener('keyup', this.keyup, false);
    };
    // methods
    Trackball.prototype.handleResize = function () {
        if (this.domElement === document) {
            this.screen.left = 0;
            this.screen.top = 0;
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;
        }
        else {
            var box = this.domElement.getBoundingClientRect();
            // adjustments come from similar code in the jquery offset() function
            var d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;
        }
    };
    ;
    Trackball.prototype.handleEvent = function (event) {
        if (typeof this[event.type] === 'function') {
            this[event.type](event);
        }
    };
    ;
    Trackball.prototype.getMouseOnScreen = function (pageX, pageY) {
        return new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]((pageX - this.screen.left) / this.screen.width, (pageY - this.screen.top) / this.screen.height);
    };
    Trackball.prototype.getMouseOnCircle = function (pageX, pageY) {
        return new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)), ((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width) // screen.width intentional
        );
    };
    Trackball.prototype.checkDistances = function () {
        if (!this.noZoom || !this.noPan) {
            if (this.eye.lengthSq() > this.maxDistance * this.maxDistance) {
                this.camera.position.addVectors(this.target, this.eye.setLength(this.maxDistance));
            }
            if (this.eye.lengthSq() < this.minDistance * this.minDistance) {
                this.camera.position.addVectors(this.target, this.eye.setLength(this.minDistance));
            }
        }
    };
    ;
    Trackball.prototype.update = function () {
        this.eye.subVectors(this.camera.position, this.target);
        if (!this.noRotate) {
            this.rotateCamera();
        }
        if (!this.noZoom) {
            this.zoomCamera();
        }
        if (!this.noPan) {
            this.panCamera();
        }
        if (!this.noCustom) {
            this.custom(this.customStart, this.customEnd);
        }
        this.camera.position.addVectors(this.target, this.eye);
        this.checkDistances();
        this.camera.lookAt(this.target);
        if (this.lastPosition.distanceToSquared(this.camera.position) > this.EPS) {
            this.dispatchEvent({ type: 'change' });
            this.lastPosition.copy(this.camera.position);
        }
    };
    ;
    Trackball.prototype.finishCurrentTransition = function () {
        if (this.changeTimeout !== undefined) {
            clearInterval(this.changeTimeout);
            this.changeTimeout = undefined;
            this.changeCamera(this.toPosition, this.toTarget, this.toUp, 0);
        }
    };
    Trackball.prototype.changeCamera = function (newPosition, newTarget, newUp, milliseconds, done) {
        var _this = this;
        if (this.target.equals(newTarget) && this.camera.position.equals(newPosition) && this.camera.up.equals(newUp)) {
            return;
        }
        if (milliseconds <= 0) {
            this.state = STATE.NONE;
            this.previousState = STATE.NONE;
            this.target.copy(newTarget);
            this.camera.position.copy(newPosition);
            this.camera.up.copy(newUp);
            this.eye.subVectors(this.camera.position, this.target);
            this.camera.lookAt(this.target);
            //_this.dispatchEvent(changeEvent);
            this.lastPosition.copy(this.camera.position);
        }
        else {
            //cancel previous animation
            if (this.changeTimeout !== undefined) {
                clearInterval(this.changeTimeout);
                this.changeTimeout = undefined;
            }
            this.toTarget = newTarget;
            this.toPosition = newPosition;
            this.toUp = newUp;
            var changeTime_1 = 0;
            var delta_1 = 30 / milliseconds;
            this.changeTimeout = setInterval(function (fromTarget, fromPosition, fromUp, toTarget, toPosition, toUp) {
                _this.enabled = false;
                var t = changeTime_1;
                var interPolateTime = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in/out function
                var nextPosition = fromPosition.clone();
                var distancePosition = toPosition.clone();
                distancePosition.sub(fromPosition);
                nextPosition.addScaledVector(distancePosition, interPolateTime);
                var nextTarget = fromTarget.clone();
                var distanceTarget = toTarget.clone();
                distanceTarget.sub(fromTarget);
                nextTarget.addScaledVector(distanceTarget, interPolateTime);
                var nextUp = fromUp.clone();
                var distanceUp = toUp.clone();
                distanceUp.sub(fromUp);
                nextUp.addScaledVector(distanceUp, interPolateTime);
                nextUp.normalize();
                _this.changeCamera(nextPosition, nextTarget, nextUp, 0);
                changeTime_1 += delta_1;
                if (changeTime_1 > 1.0) {
                    _this.changeCamera(toPosition, toTarget, toUp, 0);
                    //console.log('end anim');
                    clearInterval(_this.changeTimeout);
                    _this.changeTimeout = undefined;
                    _this.enabled = true;
                    if (done) {
                        done();
                    }
                }
            }, 30, this.target.clone(), this.camera.position.clone(), this.camera.up.clone(), newTarget, newPosition, newUp);
        }
    };
    ;
    Trackball.prototype.reset = function () {
        this.changeCamera(this.target0, this.position0, this.up0, 0);
        this.dispatchEvent({ type: 'change' });
    };
    ;
    Trackball.prototype.setState = function (targetState) {
        this.forceState = targetState;
        this.previousState = targetState;
        this.state = targetState;
    };
    ;
    Trackball.prototype.custom = function (customStart, customEnd) {
        //TODO Nothing yet
    };
    ;
    // listeners
    Trackball.prototype.keydown = function (event) {
        if (this.enabled === false) {
            return;
        }
        window.removeEventListener('keydown', this.keydown);
        this.previousState = this.state;
        if (this.state !== STATE.NONE) {
            return;
        }
        else if (event.keyCode === this.keys[STATE.ROTATE] && !this.noRotate) {
            this.state = STATE.ROTATE;
        }
        else if (event.keyCode === this.keys[STATE.ZOOM] && !this.noZoom) {
            this.state = STATE.ZOOM;
        }
        else if (event.keyCode === this.keys[STATE.PAN] && !this.noPan) {
            this.state = STATE.PAN;
        }
    };
    Trackball.prototype.keyup = function (event) {
        if (this.enabled === false) {
            return;
        }
        this.state = this.previousState;
        window.addEventListener('keydown', this.keydown, false);
    };
    Trackball.prototype.touchstart = function (event) {
        if (this.enabled === false) {
            return;
        }
        if (this.forceState === -1) {
            switch (event.touches.length) {
                case 1:
                    this.state = STATE.TOUCH_ROTATE;
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this.movePrev.copy(this.moveCurr);
                    break;
                case 2:
                    this.state = STATE.TOUCH_ZOOM;
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = this.touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panStart.copy(this.getMouseOnScreen(x, y));
                    this.panEnd.copy(this.panStart);
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
        else {
            // { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
            switch (this.state) {
                case 0:
                    // 1 or 2 fingers, smae behavior
                    this.state = STATE.TOUCH_ROTATE;
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this.movePrev.copy(this.moveCurr);
                    break;
                case 1:
                case 4:
                    if (event.touches.length >= 2) {
                        this.state = STATE.TOUCH_ZOOM;
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        this.touchZoomDistanceEnd = this.touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                    }
                    else {
                        this.state = STATE.ZOOM;
                        this.zoomStart.copy(this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));
                        this.zoomEnd.copy(this.zoomStart);
                    }
                    break;
                case 2:
                case 5:
                    if (event.touches.length >= 2) {
                        this.state = STATE.TOUCH_PAN;
                        var x_1 = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                        var y_1 = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                        this.panStart.copy(this.getMouseOnScreen(x_1, y_1));
                        this.panEnd.copy(this.panStart);
                    }
                    else {
                        this.state = STATE.PAN;
                        this.panStart.copy(this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));
                        this.panEnd.copy(this.panStart);
                    }
                    break;
                case 99:
                    this.state = STATE.CUSTOM;
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.customStart.copy(this.getMouseOnScreen(x, y));
                    this.customEnd.copy(this.customStart);
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
        this.dispatchEvent({ type: 'start' });
    };
    Trackball.prototype.touchmove = function (event) {
        if (this.enabled === false) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.forceState === -1) {
            switch (event.touches.length) {
                case 1:
                    this.movePrev.copy(this.moveCurr);
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 2:
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panEnd.copy(this.getMouseOnScreen(x, y));
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
        else {
            var x = void 0, y = void 0;
            // { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
            switch (this.state) {
                case 0:
                    this.movePrev.copy(this.moveCurr);
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 1:
                    this.zoomEnd.copy(this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 2:
                    this.panEnd.copy(this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 4:
                    // 2 fingers!
                    // TOUCH ZOOM
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    break;
                case 5:
                    // 2 fingers
                    // TOUCH_PAN
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panEnd.copy(this.getMouseOnScreen(x, y));
                    break;
                case 99:
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.customEnd.copy(this.getMouseOnScreen(x, y));
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
    };
    Trackball.prototype.touchend = function (event) {
        if (this.enabled === false) {
            return;
        }
        if (this.forceState === -1) {
            switch (event.touches.length) {
                case 1:
                    this.movePrev.copy(this.moveCurr);
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 2:
                    this.touchZoomDistanceStart = this.touchZoomDistanceEnd = 0;
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panEnd.copy(this.getMouseOnScreen(x, y));
                    this.panStart.copy(this.panEnd);
                    break;
            }
            this.state = STATE.NONE;
        }
        else {
            switch (this.state) {
                case 0:
                    this.movePrev.copy(this.moveCurr);
                    this.moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 1:
                case 2:
                    break;
                case 4:
                    // TOUCH ZOOM
                    this.touchZoomDistanceStart = this.touchZoomDistanceEnd = 0;
                    this.state = STATE.ZOOM;
                    break;
                case 5:
                    // TOUCH ZOOM
                    if (event.touches.length >= 2) {
                        var x_2 = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                        var y_2 = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                        this.panEnd.copy(this.getMouseOnScreen(x_2, y_2));
                        this.panStart.copy(this.panEnd);
                    }
                    this.state = STATE.PAN;
                    break;
                case 99:
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.customEnd.copy(this.getMouseOnScreen(x, y));
                    this.customStart.copy(this.customEnd);
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
        this.dispatchEvent({ type: 'end', state: this.state, newTarget: this.target, newPosition: this.target, newUp: this.target });
    };
    return Trackball;
}(three__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]));
/* harmony default export */ __webpack_exports__["default"] = (Trackball);


/***/ }),

/***/ "./src/app/provenance-slides/provenance-slides.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/provenance-slides/provenance-slides.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#slideDeck {\n    background-color: white;\n}"

/***/ }),

/***/ "./src/app/provenance-slides/provenance-slides.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/provenance-slides/provenance-slides.component.ts ***!
  \******************************************************************/
/*! exports provided: ProvenanceSlidesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidesComponent", function() { return ProvenanceSlidesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provenance.service */ "./src/app/provenance.service.ts");
/* harmony import */ var _provenance_slide_deck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../provenance-slide-deck */ "../provenance-slide-deck/dist/provenance-slide-deck.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// todo: update to normal node_modules path when published
var ProvenanceSlidesComponent = /** @class */ (function () {
    function ProvenanceSlidesComponent(elementRef, provenance) {
        this.elementRef = elementRef;
        this.provenance = provenance;
    }
    ProvenanceSlidesComponent.prototype.addSlide = function () {
        this._deck.addSlide(new _provenance_slide_deck__WEBPACK_IMPORTED_MODULE_2__["ProvenanceSlide"]('slide', 1000, 1000));
    };
    ProvenanceSlidesComponent.prototype.ngOnInit = function () {
        this._deck = new _provenance_slide_deck__WEBPACK_IMPORTED_MODULE_2__["ProvenanceSlidedeck"](this.provenance.graph.application, this.provenance.traverser);
        this._deckViz = new _provenance_slide_deck__WEBPACK_IMPORTED_MODULE_2__["ProvenanceSlidedeckVisualization"](this._deck, this.elementRef.nativeElement.children[1]);
    };
    ProvenanceSlidesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-provenance-slides',
            template: '<button mat-button color="primary" (click)="addSlide()">Add slide</button><div id="slideDeck"></div>',
            styles: [__webpack_require__(/*! ./provenance-slides.component.css */ "./src/app/provenance-slides/provenance-slides.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _provenance_service__WEBPACK_IMPORTED_MODULE_1__["ProvenanceService"]])
    ], ProvenanceSlidesComponent);
    return ProvenanceSlidesComponent;
}());



/***/ }),

/***/ "./src/app/provenance-visualization/provenance-visualization.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/provenance-visualization/provenance-visualization.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-provenance-visualization {\n    height: 300px;\n    width: 300px;\n    display: block;\n}\n\n.node {\n    fill: lightsteelblue;\n    stroke: steelblue;\n    cursor: pointer;\n}\n\n.node circle {\n    stroke-width: .3px;\n}\n\n.node.branch-active {\n    fill: yellow;\n    background-color: #ccc;\n}\n\n.node.branch-active text {\n    display: block;\n}\n\n.node.node-active {\n    fill: blue;\n    stroke: darkblue;\n}\n\n.node text {\n    display: none;\n    fill: white;\n    stroke-width: 0;\n    font-family: sans-serif;\n}\n\n.link {\n    fill: none;\n    stroke: white;\n    stroke-width: .5px;\n}\n\n.link.active {\n    stroke: white;\n}"

/***/ }),

/***/ "./src/app/provenance-visualization/provenance-visualization.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/provenance-visualization/provenance-visualization.component.ts ***!
  \********************************************************************************/
/*! exports provided: ProvenanceVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceVisualizationComponent", function() { return ProvenanceVisualizationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provenance.service */ "./src/app/provenance.service.ts");
/* harmony import */ var _visualstorytelling_provenance_tree_visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @visualstorytelling/provenance-tree-visualization */ "./node_modules/@visualstorytelling/provenance-tree-visualization/dist/provenance-tree-visualization.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProvenanceVisualizationComponent = /** @class */ (function () {
    function ProvenanceVisualizationComponent(elementRef, provenance) {
        this.elementRef = elementRef;
        this.provenance = provenance;
    }
    ProvenanceVisualizationComponent.prototype.ngOnInit = function () {
        this._viz = new _visualstorytelling_provenance_tree_visualization__WEBPACK_IMPORTED_MODULE_2__["ProvenanceTreeVisualization"](this.provenance.traverser, this.elementRef.nativeElement);
    };
    ProvenanceVisualizationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-provenance-visualization',
            template: '',
            styles: [__webpack_require__(/*! ./provenance-visualization.component.css */ "./src/app/provenance-visualization/provenance-visualization.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _provenance_service__WEBPACK_IMPORTED_MODULE_1__["ProvenanceService"]])
    ], ProvenanceVisualizationComponent);
    return ProvenanceVisualizationComponent;
}());



/***/ }),

/***/ "./src/app/provenance.service.ts":
/*!***************************************!*\
  !*** ./src/app/provenance.service.ts ***!
  \***************************************/
/*! exports provided: ProvenanceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceService", function() { return ProvenanceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @visualstorytelling/provenance-core */ "./node_modules/@visualstorytelling/provenance-core/dist/provenance-core.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProvenanceService = /** @class */ (function () {
    function ProvenanceService() {
        this.graph = new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__["ProvenanceGraph"]({ name: 'brainvis', version: '1.0.0' });
        this.registry = new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__["ActionFunctionRegistry"]();
        this.tracker = new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__["ProvenanceTracker"](this.registry, this.graph);
        this.traverser = new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__["ProvenanceGraphTraverser"](this.registry, this.graph, this.tracker);
        // todo: remove objects from window (used for dev / debug)
        var w = window;
        w.graph = this.graph;
        w.registry = this.registry;
        w.tracker = this.tracker;
        w.traverser = this.traverser;
    }
    ProvenanceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ProvenanceService);
    return ProvenanceService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* There is a bug in `ami.js` so that it needs a global THREE when imported.
   This file ensures it is attached to `window` before the rest of the app is loaded
 */
window.THREE = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
__webpack_require__(/*! ./init.ts */ "./src/init.ts");


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tom/Projects/prov/brainvis/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map