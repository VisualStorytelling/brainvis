(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./packages/@visualstorytelling/provenance-core/dist/provenance-core.es5.js":
/*!**********************************************************************************!*\
  !*** ./packages/@visualstorytelling/provenance-core/dist/provenance-core.es5.js ***!
  \**********************************************************************************/
/*! exports provided: ActionFunctionRegistry, ProvenanceGraph, restoreProvenanceGraph, serializeProvenanceGraph, ProvenanceTracker, ProvenanceGraphTraverser, ProvenanceSlide, ProvenanceSlidedeck, STATUS, ProvenanceSlidedeckPlayer, SlideAnnotation, generateUUID, generateTimestamp, isStateNode, isReversibleAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionFunctionRegistry", function() { return ActionFunctionRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceGraph", function() { return ProvenanceGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restoreProvenanceGraph", function() { return restoreProvenanceGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeProvenanceGraph", function() { return serializeProvenanceGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceTracker", function() { return ProvenanceTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceGraphTraverser", function() { return ProvenanceGraphTraverser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlide", function() { return ProvenanceSlide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidedeck", function() { return ProvenanceSlidedeck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceSlidedeckPlayer", function() { return ProvenanceSlidedeckPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideAnnotation", function() { return SlideAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTimestamp", function() { return generateTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStateNode", function() { return isStateNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isReversibleAction", function() { return isReversibleAction; });
var ActionFunctionRegistry = /** @class */ (function () {
    function ActionFunctionRegistry() {
        this.functionRegistry = {};
    }
    /**
     * Register a new function into the provenance tracker (to be able to call it later)
     *
     * @param name The name of the new function to register
     * @param func The ActionFunction to register
     * @param thisArg Value to use as this (i.e the reference Object) when executing callback
     *
     */
    ActionFunctionRegistry.prototype.register = function (name, func, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        if (this.functionRegistry[name]) {
            throw new Error('Function already registered');
        }
        this.functionRegistry[name] = { func: func, thisArg: thisArg };
    };
    ActionFunctionRegistry.prototype.getFunctionByName = function (name) {
        if (!this.functionRegistry[name]) {
            throw new Error('Function \'' + name + '\' not found in registry');
        }
        return this.functionRegistry[name];
    };
    return ActionFunctionRegistry;
}());

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

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
function isStateNode(node) {
    return 'parent' in node;
}
function isReversibleAction(action) {
    return 'undo' in action;
}

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
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
        this._mitt = mitt();
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
/* Beware that deeply nested properties in serializedProvenanceGraph is mutated in the process */
function restoreProvenanceGraph(serializedProvenanceGraph) {
    var nodes = {};
    // restore nodes as key value
    for (var _i = 0, _a = serializedProvenanceGraph.nodes; _i < _a.length; _i++) {
        var node = _a[_i];
        nodes[node.id] = __assign({}, node);
    }
    // restore parent/children relations
    for (var _b = 0, _c = Object.keys(nodes); _b < _c.length; _b++) {
        var nodeId = _c[_b];
        var node = nodes[nodeId];
        node.children = node.children.map(function (id) { return nodes[id]; });
        if ('parent' in node) {
            node.parent = nodes[node.parent];
        }
    }
    var graph = new ProvenanceGraph(serializedProvenanceGraph.application);
    graph._nodes = nodes;
    graph._current = nodes[serializedProvenanceGraph.current];
    graph.root = nodes[serializedProvenanceGraph.root];
    return graph;
}
function serializeProvenanceGraph(graph) {
    var nodes = Object.keys(graph.nodes).map(function (nodeId) {
        var node = graph.getNode(nodeId);
        var serializedNode = __assign({}, node);
        if (isStateNode(node)) {
            serializedNode.parent = node.parent.id;
        }
        serializedNode.children = node.children.map(function (child) { return child.id; });
        return serializedNode;
    });
    return {
        nodes: nodes,
        root: graph.root.id,
        application: graph.application,
        current: graph.current.id
    };
}

/**
 * Provenance Graph Tracker implementation
 *
 * @param graph The provenance graph to track (this will serve as storage construct)
 * @param current Optional parameter to set current node for importing a provenance graph that is non-empty
 *
 */
var ProvenanceTracker = /** @class */ (function () {
    function ProvenanceTracker(registry, graph, username) {
        if (username === void 0) { username = 'Unknown'; }
        /**
         * When acceptActions is false, the Tracker will ignore calls to applyAction
         */
        this.acceptActions = true;
        this.registry = registry;
        this.graph = graph;
        this.username = username;
    }
    /**
     * Calls the action.do function with action.doArguments
     *
     * @param action
     * @param skipFirstDoFunctionCall If set to true, the do-function will not be called this time,
     *        it will only be called when traversing.
     */
    ProvenanceTracker.prototype.applyAction = function (action, skipFirstDoFunctionCall) {
        if (skipFirstDoFunctionCall === void 0) { skipFirstDoFunctionCall = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var createNewStateNode, newNode, currentNode, functionNameToExecute, funcWithThis, actionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.acceptActions) {
                            return [2 /*return*/, Promise.resolve(this.graph.current)];
                        }
                        createNewStateNode = function (parentNode, actionResult) { return ({
                            id: generateUUID(),
                            label: action.do,
                            metadata: {
                                createdBy: _this.username,
                                createdOn: generateTimestamp()
                            },
                            action: action,
                            actionResult: actionResult,
                            parent: parentNode,
                            children: [],
                            artifacts: {}
                        }); };
                        currentNode = this.graph.current;
                        if (!skipFirstDoFunctionCall) return [3 /*break*/, 1];
                        newNode = createNewStateNode(this.graph.current, null);
                        return [3 /*break*/, 3];
                    case 1:
                        functionNameToExecute = action.do;
                        funcWithThis = this.registry.getFunctionByName(functionNameToExecute);
                        return [4 /*yield*/, funcWithThis.func.apply(funcWithThis.thisArg, action.doArguments)];
                    case 2:
                        actionResult = _a.sent();
                        newNode = createNewStateNode(currentNode, actionResult);
                        _a.label = 3;
                    case 3:
                        // When the node is created, we need to update the graph.
                        currentNode.children.push(newNode);
                        this.graph.addNode(newNode);
                        this.graph.current = newNode;
                        return [2 /*return*/, newNode];
                }
            });
        });
    };
    return ProvenanceTracker;
}());

function isNextNodeInTrackUp(currentNode, nextNode) {
    if (isStateNode(currentNode) && currentNode.parent === nextNode) {
        return true;
    }
    else if (isStateNode(nextNode) && nextNode.parent !== currentNode) {
        // This is a guard against the illegitimate use of this function for unconnected nodes
        /* istanbul ignore next */
        throw new Error('Unconnected nodes, you probably should not be using this function');
    }
    else {
        return false;
    }
}
function findPathToTargetNode(currentNode, targetNode, track, comingFromNode) {
    if (comingFromNode === void 0) { comingFromNode = currentNode; }
    if (currentNode && currentNode === targetNode) {
        track.unshift(currentNode);
        return true;
    }
    else if (currentNode) {
        // Map the StateNodes in the children StateEdges
        var nodesToCheck = currentNode.children.slice();
        // Add the parent node to that same list
        /* istanbul ignore else */
        if (isStateNode(currentNode)) {
            nodesToCheck.push(currentNode.parent);
        }
        for (var _i = 0, nodesToCheck_1 = nodesToCheck; _i < nodesToCheck_1.length; _i++) {
            var node = nodesToCheck_1[_i];
            // If the node to check is in the track already, skip it.
            if (node === comingFromNode)
                continue;
            /* istanbul ignore else */
            if (findPathToTargetNode(node, targetNode, track, currentNode)) {
                track.unshift(currentNode);
                return true;
            }
        }
    }
    /* istanbul ignore next */
    return false;
}
var ProvenanceGraphTraverser = /** @class */ (function () {
    function ProvenanceGraphTraverser(registry, graph, tracker) {
        if (tracker === void 0) { tracker = null; }
        /**
         * trackingWhenTraversing === false disables tracking when traversing to prevent feedback.
         * When applying an action, the object we're tracking might trigger its event listeners. This
         * means that more Nodes are added to the ProvenanceGraph when traversing, which is most likely
         * unwanted behaviour.
         *
         * It will enable/disable immediately before/after calling the action. So if the event is emitted
         * asynchronously after the action, it will not work.
         */
        this.trackingWhenTraversing = false;
        this.registry = registry;
        this.graph = graph;
        this.tracker = tracker;
    }
    ProvenanceGraphTraverser.prototype.executeFunctions = function (functionsToDo, argumentsToDo) {
        return __awaiter(this, void 0, void 0, function () {
            var result, i, funcWithThis, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < functionsToDo.length)) return [3 /*break*/, 4];
                        funcWithThis = functionsToDo[i];
                        promise = void 0;
                        if (this.tracker && this.tracker.acceptActions && !this.trackingWhenTraversing) {
                            this.tracker.acceptActions = false;
                            promise = funcWithThis.func.apply(funcWithThis.thisArg, argumentsToDo[i]);
                            this.tracker.acceptActions = true;
                        }
                        else {
                            promise = funcWithThis.func.apply(funcWithThis.thisArg, argumentsToDo[i]);
                        }
                        return [4 /*yield*/, promise];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Finds shortest path between current node and node with request identifer.
     * Calls the do/undo functions of actions on the path.
     *
     * @param id Node identifier
     */
    ProvenanceGraphTraverser.prototype.toStateNode = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var currentNode, targetNode, trackToTarget, success, _a, functionsToDo, argumentsToDo, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentNode = this.graph.current;
                        targetNode = this.graph.getNode(id);
                        if (currentNode === targetNode) {
                            return [2 /*return*/, Promise.resolve(currentNode)];
                        }
                        trackToTarget = [];
                        success = findPathToTargetNode(currentNode, targetNode, trackToTarget);
                        /* istanbul ignore if */
                        if (!success) {
                            throw new Error('No path to target node found in graph');
                        }
                        _a = this.getFunctionsAndArgsFromTrack(trackToTarget), functionsToDo = _a.functionsToDo, argumentsToDo = _a.argumentsToDo;
                        return [4 /*yield*/, this.executeFunctions(functionsToDo, argumentsToDo)];
                    case 1:
                        result = _b.sent();
                        this.graph.current = targetNode;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProvenanceGraphTraverser.prototype.getFunctionsAndArgsFromTrack = function (track) {
        var functionsToDo = [];
        var argumentsToDo = [];
        for (var i = 0; i < track.length - 1; i++) {
            var thisNode = track[i];
            var nextNode = track[i + 1];
            var up = isNextNodeInTrackUp(thisNode, nextNode);
            if (up) {
                /* istanbul ignore else */
                if (isStateNode(thisNode)) {
                    if (!isReversibleAction(thisNode.action)) {
                        throw new Error('trying to undo an Irreversible action');
                    }
                    var undoFunc = this.registry.getFunctionByName(thisNode.action.undo);
                    functionsToDo.push(undoFunc);
                    argumentsToDo.push(thisNode.action.undoArguments);
                }
                else {
                    /* istanbul ignore next */
                    throw new Error('Going up from root? unreachable error ... i hope');
                }
            }
            else {
                /* istanbul ignore else */
                if (isStateNode(nextNode)) {
                    var doFunc = this.registry.getFunctionByName(nextNode.action.do);
                    functionsToDo.push(doFunc);
                    argumentsToDo.push(nextNode.action.doArguments);
                }
                else {
                    /* istanbul ignore next */
                    throw new Error('Going down to the root? unreachable error ... i hope');
                }
            }
        }
        return { functionsToDo: functionsToDo, argumentsToDo: argumentsToDo };
    };
    return ProvenanceGraphTraverser;
}());

var ProvenanceSlide = /** @class */ (function () {
    function ProvenanceSlide(name, duration, delay, annotations, node) {
        if (annotations === void 0) { annotations = []; }
        if (node === void 0) { node = null; }
        this._id = generateUUID();
        this._name = name;
        this._duration = duration;
        this._delay = delay;
        this._annotations = annotations;
        this._node = node;
        this._mitt = mitt();
    }
    Object.defineProperty(ProvenanceSlide.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (value) {
            this._node = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = value;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.addAnnotation = function (annotation) {
        this._annotations.push(annotation);
        this._mitt.emit('addAnnotation', annotation);
    };
    ProvenanceSlide.prototype.removeAnnotation = function (annotation) {
        var index = this._annotations.indexOf(annotation);
        this._annotations.splice(index, 1);
        this._mitt.emit('removeAnnotation', annotation);
    };
    Object.defineProperty(ProvenanceSlide.prototype, "annotations", {
        get: function () {
            return this._annotations;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlide.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlide;
}());

var ProvenanceSlidedeck = /** @class */ (function () {
    function ProvenanceSlidedeck(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt();
        this._application = application;
        this._graph = traverser.graph;
        this._traverser = traverser;
        this._selectedSlide = null;
    }
    Object.defineProperty(ProvenanceSlidedeck.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.addSlide = function (slide, index) {
        if (!index ||
            isNaN(index) ||
            !Number.isInteger(index) ||
            index > this._slides.length ||
            index < 0) {
            index = this._slides.length;
        }
        if (slide && this._slides.indexOf(slide) >= 0) {
            throw new Error('Cannot add a slide that is already in the deck');
        }
        if (!slide) {
            var node = this._graph.current;
            slide = new ProvenanceSlide(node.label, 1, 0, [], node);
        }
        if (this._slides.length === 0) {
            this._selectedSlide = slide;
        }
        this._slides.splice(index, 0, slide);
        this._mitt.emit('slideAdded', slide);
        return slide;
    };
    ProvenanceSlidedeck.prototype.removeSlideAtIndex = function (index) {
        var deletedSlides = this._slides.splice(index, 1);
        // This can only be 1 slide now, therefore this is ok.
        if (this._selectedSlide === deletedSlides[0]) {
            this.selectedSlide = null;
        }
        this._mitt.emit('slideRemoved', deletedSlides[0]);
    };
    ProvenanceSlidedeck.prototype.removeSlide = function (slide) {
        this.removeSlideAtIndex(this._slides.indexOf(slide));
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "selectedSlide", {
        get: function () {
            return this._selectedSlide;
        },
        set: function (slide) {
            if (slide && slide.node) {
                this._traverser.toStateNode(slide.node.id);
            }
            this._selectedSlide = slide;
            this._mitt.emit('slideSelected', slide);
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.moveSlide = function (indexFrom, indexTo) {
        if (indexTo < 0 || indexTo > this.slides.length - 1) {
            throw new Error('target index out of bounds');
        }
        if (indexTo >= this._slides.length) {
            var k = indexTo - this._slides.length + 1;
            while (k--) {
                this._slides.push(this._captainPlaceholder);
            }
        }
        this._slides.splice(indexTo, 0, this._slides.splice(indexFrom, 1)[0]);
        this._mitt.emit('slidesMoved', this._slides);
    };
    ProvenanceSlidedeck.prototype.startTime = function (slide) {
        var index = this._slides.indexOf(slide);
        var previousTime = 0;
        for (var i = 0; i < index; i++) {
            previousTime += this._slides[i].delay;
            previousTime += this._slides[i].duration;
        }
        return previousTime;
    };
    ProvenanceSlidedeck.prototype.slideAtTime = function (time) {
        var index = 0;
        var currentSlide = null;
        while (time >= 0 && index < this.slides.length) {
            currentSlide = this.slides[index];
            var nextSlideOffset = currentSlide.delay + currentSlide.duration;
            if (time - nextSlideOffset < 0) {
                break;
            }
            time -= nextSlideOffset;
            index++;
        }
        return currentSlide;
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeck.prototype, "graph", {
        get: function () {
            return this._graph;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlidedeck.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlidedeck;
}());

var STATUS;
(function (STATUS) {
    STATUS[STATUS["IDLE"] = 0] = "IDLE";
    STATUS[STATUS["PLAYING"] = 1] = "PLAYING";
})(STATUS || (STATUS = {}));
var wait = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
var ProvenanceSlidedeckPlayer = /** @class */ (function () {
    function ProvenanceSlidedeckPlayer(slides, selectCallback) {
        this._selectCallback = selectCallback;
        this._slides = slides;
        this._currentSlideIndex = 0;
        this._status = STATUS.IDLE;
    }
    ProvenanceSlidedeckPlayer.prototype.setSlideIndex = function (slideIndex) {
        this._currentSlideIndex = slideIndex;
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "currentSlideIndex", {
        get: function () {
            return this._currentSlideIndex;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var shouldPlayNext, slide;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldPlayNext = function () {
                            return _this._status === STATUS.PLAYING && _this._currentSlideIndex < _this._slides.length - 1;
                        };
                        if (!(this._status === STATUS.IDLE)) return [3 /*break*/, 4];
                        this._status = STATUS.PLAYING;
                        _a.label = 1;
                    case 1:
                        slide = this._slides[this._currentSlideIndex];
                        return [4 /*yield*/, wait(slide.duration)];
                    case 2:
                        _a.sent();
                        if (shouldPlayNext()) {
                            this._currentSlideIndex += 1;
                            this._selectCallback(this._slides[this._currentSlideIndex]);
                        }
                        _a.label = 3;
                    case 3:
                        if (shouldPlayNext()) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this._status = STATUS.IDLE;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.stop = function () {
        this._status = STATUS.IDLE;
    };
    return ProvenanceSlidedeckPlayer;
}());

var SlideAnnotation = /** @class */ (function () {
    function SlideAnnotation(data) {
        this._id = generateUUID();
        this._data = data;
        this._mitt = mitt();
    }
    Object.defineProperty(SlideAnnotation.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideAnnotation.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this._mitt.emit('change', value);
        },
        enumerable: true,
        configurable: true
    });
    SlideAnnotation.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    SlideAnnotation.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return SlideAnnotation;
}());

// export { SerializedProvenanceGraph } from './api';
// export { SerializedRootNode } from './api';
// export { SerializedStateNode } from './api';
// export { SerializedProvenanceNode } from './api';


//# sourceMappingURL=provenance-core.es5.js.map


/***/ }),

/***/ "./packages/@visualstorytelling/provenance-tree-visualization/dist/provenance-tree-visualization.es5.js":
/*!**************************************************************************************************************!*\
  !*** ./packages/@visualstorytelling/provenance-tree-visualization/dist/provenance-tree-visualization.es5.js ***!
  \**************************************************************************************************************/
/*! exports provided: GroupMode, ProvenanceTreeVisualization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMode", function() { return GroupMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvenanceTreeVisualization", function() { return ProvenanceTreeVisualization; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");


function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
function isStateNode(node) {
    return 'parent' in node;
}

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
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
        this._mitt = mitt();
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

var ProvenanceSlide = /** @class */ (function () {
    function ProvenanceSlide(name, duration, delay, annotations, node) {
        if (annotations === void 0) { annotations = []; }
        if (node === void 0) { node = null; }
        this._id = generateUUID();
        this._name = name;
        this._duration = duration;
        this._delay = delay;
        this._annotations = annotations;
        this._node = node;
        this._mitt = mitt();
    }
    Object.defineProperty(ProvenanceSlide.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (value) {
            this._node = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = value;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.addAnnotation = function (annotation) {
        this._annotations.push(annotation);
        this._mitt.emit('addAnnotation', annotation);
    };
    ProvenanceSlide.prototype.removeAnnotation = function (annotation) {
        var index = this._annotations.indexOf(annotation);
        this._annotations.splice(index, 1);
        this._mitt.emit('removeAnnotation', annotation);
    };
    Object.defineProperty(ProvenanceSlide.prototype, "annotations", {
        get: function () {
            return this._annotations;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlide.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlide;
}());

var ProvenanceSlidedeck = /** @class */ (function () {
    function ProvenanceSlidedeck(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt();
        this._application = application;
        this._graph = traverser.graph;
        this._traverser = traverser;
        this._selectedSlide = null;
    }
    Object.defineProperty(ProvenanceSlidedeck.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.addSlide = function (slide, index) {
        if (!index ||
            isNaN(index) ||
            !Number.isInteger(index) ||
            index > this._slides.length ||
            index < 0) {
            index = this._slides.length;
        }
        if (slide && this._slides.indexOf(slide) >= 0) {
            throw new Error('Cannot add a slide that is already in the deck');
        }
        if (!slide) {
            var node = this._graph.current;
            slide = new ProvenanceSlide(node.label, 1, 0, [], node);
        }
        if (this._slides.length === 0) {
            this._selectedSlide = slide;
        }
        this._slides.splice(index, 0, slide);
        this._mitt.emit('slideAdded', slide);
        return slide;
    };
    ProvenanceSlidedeck.prototype.removeSlideAtIndex = function (index) {
        var deletedSlides = this._slides.splice(index, 1);
        // This can only be 1 slide now, therefore this is ok.
        if (this._selectedSlide === deletedSlides[0]) {
            this.selectedSlide = null;
        }
        this._mitt.emit('slideRemoved', deletedSlides[0]);
    };
    ProvenanceSlidedeck.prototype.removeSlide = function (slide) {
        this.removeSlideAtIndex(this._slides.indexOf(slide));
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "selectedSlide", {
        get: function () {
            return this._selectedSlide;
        },
        set: function (slide) {
            if (slide && slide.node) {
                this._traverser.toStateNode(slide.node.id);
            }
            this._selectedSlide = slide;
            this._mitt.emit('slideSelected', slide);
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.moveSlide = function (indexFrom, indexTo) {
        if (indexTo < 0 || indexTo > this.slides.length - 1) {
            throw new Error('target index out of bounds');
        }
        if (indexTo >= this._slides.length) {
            var k = indexTo - this._slides.length + 1;
            while (k--) {
                this._slides.push(this._captainPlaceholder);
            }
        }
        this._slides.splice(indexTo, 0, this._slides.splice(indexFrom, 1)[0]);
        this._mitt.emit('slidesMoved', this._slides);
    };
    ProvenanceSlidedeck.prototype.startTime = function (slide) {
        var index = this._slides.indexOf(slide);
        var previousTime = 0;
        for (var i = 0; i < index; i++) {
            previousTime += this._slides[i].delay;
            previousTime += this._slides[i].duration;
        }
        return previousTime;
    };
    ProvenanceSlidedeck.prototype.slideAtTime = function (time) {
        var index = 0;
        var currentSlide = null;
        while (time >= 0 && index < this.slides.length) {
            currentSlide = this.slides[index];
            var nextSlideOffset = currentSlide.delay + currentSlide.duration;
            if (time - nextSlideOffset < 0) {
                break;
            }
            time -= nextSlideOffset;
            index++;
        }
        return currentSlide;
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeck.prototype, "graph", {
        get: function () {
            return this._graph;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlidedeck.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlidedeck;
}());

var STATUS;
(function (STATUS) {
    STATUS[STATUS["IDLE"] = 0] = "IDLE";
    STATUS[STATUS["PLAYING"] = 1] = "PLAYING";
})(STATUS || (STATUS = {}));
var wait = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
var ProvenanceSlidedeckPlayer = /** @class */ (function () {
    function ProvenanceSlidedeckPlayer(slides, selectCallback) {
        this._selectCallback = selectCallback;
        this._slides = slides;
        this._currentSlideIndex = 0;
        this._status = STATUS.IDLE;
    }
    ProvenanceSlidedeckPlayer.prototype.setSlideIndex = function (slideIndex) {
        this._currentSlideIndex = slideIndex;
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "currentSlideIndex", {
        get: function () {
            return this._currentSlideIndex;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var shouldPlayNext, slide;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldPlayNext = function () {
                            return _this._status === STATUS.PLAYING && _this._currentSlideIndex < _this._slides.length - 1;
                        };
                        if (!(this._status === STATUS.IDLE)) return [3 /*break*/, 4];
                        this._status = STATUS.PLAYING;
                        _a.label = 1;
                    case 1:
                        slide = this._slides[this._currentSlideIndex];
                        return [4 /*yield*/, wait(slide.duration)];
                    case 2:
                        _a.sent();
                        if (shouldPlayNext()) {
                            this._currentSlideIndex += 1;
                            this._selectCallback(this._slides[this._currentSlideIndex]);
                        }
                        _a.label = 3;
                    case 3:
                        if (shouldPlayNext()) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this._status = STATUS.IDLE;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.stop = function () {
        this._status = STATUS.IDLE;
    };
    return ProvenanceSlidedeckPlayer;
}());

var SlideAnnotation = /** @class */ (function () {
    function SlideAnnotation(data) {
        this._id = generateUUID();
        this._data = data;
        this._mitt = mitt();
    }
    Object.defineProperty(SlideAnnotation.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideAnnotation.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this._mitt.emit('change', value);
        },
        enumerable: true,
        configurable: true
    });
    SlideAnnotation.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    SlideAnnotation.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return SlideAnnotation;
}());
//# sourceMappingURL=provenance-core.es5.js.map

function depthSort(a, b) {
    if (a.maxDescendantDepth > b.maxDescendantDepth) {
        return -1;
    }
    else if (a.maxDescendantDepth < b.maxDescendantDepth) {
        return 1;
    }
    return 0;
}
function GratzlLayout() {
    var dx = 5;
    var dy = 50;
    var widths = [];
    function setTreeX(node, val) {
        node.xOffset = val;
        widths[node.depth] = val;
        if (node.children) {
            node
                .leaves()
                .sort(depthSort)
                .forEach(function (leaf) {
                if (typeof leaf.xOffset === 'undefined') {
                    var width = Math.max.apply(null, widths.slice(node.depth, leaf.depth + 1));
                    setTreeX(leaf, val > width ? val : width + 1);
                }
            });
        }
        if (node.parent && typeof node.parent.xOffset === 'undefined') {
            setTreeX(node.parent, val);
        }
    }
    var tree = Object.assign(function (_root, _activeNode) {
        /*
      * set maxDescendantDepth on each node,
      * which is the depth of its deepest child
      *
      * */
        var root = _root;
        var activeNode = _activeNode;
        root.leaves().forEach(function (leaf) {
            leaf.ancestors().forEach(function (leafAncestor) {
                if (!leafAncestor.maxDescendantDepth ||
                    leaf.depth > leafAncestor.maxDescendantDepth) {
                    leafAncestor.maxDescendantDepth = leaf.depth;
                }
            });
        });
        /* rendering should start at the deepest leaf of activeNode. */
        var deepestLeaf = activeNode;
        activeNode.leaves().forEach(function (leaf) {
            if (deepestLeaf.depth < leaf.depth) {
                deepestLeaf = leaf;
            }
        });
        setTreeX(deepestLeaf, 0);
        var maxX = Math.max.apply(null, widths);
        var maxY = Math.max.apply(null, root.leaves().map(function (leaf) { return leaf.depth; }));
        root.each(function (node) {
            sizeNode(node, maxX, maxY);
        });
        return root;
    }, {
        size: (function (x) {
            return x ? ((dx = +x[0]), (dy = +x[1]), tree) : [dx, dy];
        }),
    });
    function sizeNode(node, maxX, maxY) {
        node.x = maxX === 0 ? dx : dx - (dx / maxX) * node.xOffset;
        node.y = maxY === 0 ? dy : (dy / maxY) * node.depth;
    }
    return tree;
}
//# sourceMappingURL=gratzl.js.map

var GroupMode;
(function (GroupMode) {
    GroupMode[GroupMode["NONE"] = 0] = "NONE";
    GroupMode[GroupMode["INTENT"] = 1] = "INTENT";
})(GroupMode || (GroupMode = {}));
function getNodeIntent(node) {
    if (isStateNode(node) && node.action && node.action.metadata && node.action.metadata.userIntent) {
        return node.action.metadata.userIntent;
    }
    return 'none';
}
function isKeyNode(node) {
    if (!isStateNode(node) || node.children.length === 0 || node.children.length > 1 || node.parent.children.length > 1 ||
        (node.children.length === 1 && getNodeIntent(node) !== getNodeIntent(node.children[0]))) {
        return true;
    }
    return false;
}
var ProvenanceTreeVisualization = /** @class */ (function () {
    function ProvenanceTreeVisualization(traverser, elm) {
        var _this = this;
        this.groupMode = GroupMode.INTENT;
        this.traverser = traverser;
        this.svg = Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(elm).append('svg')
            .attr('viewBox', '-10 -10 130 130')
            .attr('style', 'width: 100%; height: 100%');
        traverser.graph.on('currentChanged', function () { return _this.update(); });
        this.update();
    }
    ProvenanceTreeVisualization.prototype.update = function () {
        var _this = this;
        var treeRoot = Object(d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"])(this.traverser.graph.root);
        var treeLayout = GratzlLayout().size([100 / 2, 100]);
        var layoutCurrentNode = treeRoot;
        treeRoot.each(function (node) {
            if (node.data === _this.traverser.graph.current) {
                layoutCurrentNode = node;
            }
        });
        var tree = treeLayout(treeRoot, layoutCurrentNode);
        var treeNodes = tree.descendants();
        var oldNodes = this.svg
            .selectAll('g.node')
            .data(treeNodes, function (d) { return d.data.id; });
        var newNodes = oldNodes
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function (d) {
            return "translate(" + d.x + ", " + d.y + ")";
        })
            .on('click', function (d) { return _this.traverser.toStateNode(d.data.id); });
        newNodes
            .append('circle')
            .attr('r', 2);
        newNodes
            .append('text')
            .text(function (d) { return (isStateNode(d.data) ? d.data.label : ''); })
            .attr('style', 'font-size: 8px')
            .attr('x', 7)
            .attr('y', 3);
        var updateNodes = newNodes.merge(oldNodes);
        updateNodes
            .select('circle')
            .attr('class', function (d) {
            var classString = '';
            if (isKeyNode(d.data)) {
                classString += ' keynode';
            }
            classString += ' intent_' + getNodeIntent(d.data);
            return classString;
        });
        updateNodes
            .select('text')
            .attr('visibility', function (d) {
            if (d.xOffset === 0) {
                return 'visible';
            }
            else {
                return 'hidden';
            }
        });
        updateNodes
            .filter(function (d) { return d.xOffset === 0; })
            .attr('class', 'node branch-active')
            .filter(function (d) { return d.data === _this.traverser.graph.current; })
            .attr('class', 'node branch-active node-active');
        updateNodes
            .transition()
            .duration(500)
            .attr('transform', function (d) {
            return "translate(" + d.x + ", " + d.y + ")";
        });
        var linkPath = function (_a) {
            var source = _a.source, target = _a.target;
            var _b = [source, target], s = _b[0], t = _b[1];
            // tslint:disable-next-line
            return "M" + s.x + "," + s.y + "C" + s.x + "," + (s.y + t.y) / 2 + " " + t.x + "," + (s.y + t.y) / 2 + " " + t.x + "," + t.y;
        };
        var oldLinks = this.svg
            .selectAll('path.link')
            .data(tree.links(), function (d) { return d.target.data.id; });
        var newLinks = oldLinks
            .enter()
            .insert('path', 'g')
            .attr('d', linkPath);
        oldLinks.merge(newLinks)
            .attr('class', 'link')
            .filter(function (d) { return d.target.xOffset === 0; })
            .attr('class', 'link active');
        oldLinks.merge(newLinks)
            .transition()
            .duration(500)
            .attr('d', linkPath);
    };
    return ProvenanceTreeVisualization;
}());


//# sourceMappingURL=provenance-tree-visualization.es5.js.map


/***/ }),

/***/ "./packages/@visualstorytelling/slide-deck-visualization/dist/slide-deck-visualization.es5.js":
/*!****************************************************************************************************!*\
  !*** ./packages/@visualstorytelling/slide-deck-visualization/dist/slide-deck-visualization.es5.js ***!
  \****************************************************************************************************/
/*! exports provided: SlideDeckVisualization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideDeckVisualization", function() { return SlideDeckVisualization; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");


function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        this._mitt = mitt();
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

var ProvenanceSlide = /** @class */ (function () {
    function ProvenanceSlide(name, duration, delay, annotations, node) {
        if (annotations === void 0) { annotations = []; }
        if (node === void 0) { node = null; }
        this._id = generateUUID();
        this._name = name;
        this._duration = duration;
        this._delay = delay;
        this._annotations = annotations;
        this._node = node;
    }
    Object.defineProperty(ProvenanceSlide.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (value) {
            this._node = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlide.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = value;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlide.prototype.addAnnotation = function (annotation) {
        this._annotations.push(annotation);
    };
    ProvenanceSlide.prototype.removeAnnotation = function (annotation) {
        var index = this._annotations.indexOf(annotation);
        this._annotations.splice(index, 1);
    };
    Object.defineProperty(ProvenanceSlide.prototype, "annotations", {
        get: function () {
            return this._annotations;
        },
        enumerable: true,
        configurable: true
    });
    return ProvenanceSlide;
}());

var ProvenanceSlidedeck = /** @class */ (function () {
    function ProvenanceSlidedeck(application, traverser) {
        this._slides = [];
        this._captainPlaceholder = new ProvenanceSlide('Captain Placeholder', 0, 0);
        this._mitt = mitt();
        this._application = application;
        this._graph = traverser.graph;
        this._traverser = traverser;
        this._selectedSlide = null;
    }
    Object.defineProperty(ProvenanceSlidedeck.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.addSlide = function (slide, index) {
        if (!index ||
            isNaN(index) ||
            !Number.isInteger(index) ||
            index > this._slides.length ||
            index < 0) {
            index = this._slides.length;
        }
        if (slide && this._slides.indexOf(slide) >= 0) {
            throw new Error('Cannot add a slide that is already in the deck');
        }
        if (!slide) {
            var node = this._graph.current;
            slide = new ProvenanceSlide(node.label, 1, 0, [], node);
        }
        if (this._slides.length === 0) {
            this._selectedSlide = slide;
        }
        this._slides.splice(index, 0, slide);
        this._mitt.emit('slideAdded', slide);
        return slide;
    };
    ProvenanceSlidedeck.prototype.removeSlideAtIndex = function (index) {
        var deletedSlides = this._slides.splice(index, 1);
        // This can only be 1 slide now, therefore this is ok.
        if (this._selectedSlide === deletedSlides[0]) {
            this.selectedSlide = null;
        }
        this._mitt.emit('slideRemoved', deletedSlides[0]);
    };
    ProvenanceSlidedeck.prototype.removeSlide = function (slide) {
        this.removeSlideAtIndex(this._slides.indexOf(slide));
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "selectedSlide", {
        get: function () {
            return this._selectedSlide;
        },
        set: function (slide) {
            if (slide && slide.node) {
                this._traverser.toStateNode(slide.node.id);
            }
            this._selectedSlide = slide;
            this._mitt.emit('slideSelected', slide);
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.moveSlide = function (indexFrom, indexTo) {
        if (indexTo < 0 || indexTo > this.slides.length - 1) {
            throw new Error('target index out of bounds');
        }
        if (indexTo >= this._slides.length) {
            var k = indexTo - this._slides.length + 1;
            while (k--) {
                this._slides.push(this._captainPlaceholder);
            }
        }
        this._slides.splice(indexTo, 0, this._slides.splice(indexFrom, 1)[0]);
        this._mitt.emit('slidesMoved', this._slides);
    };
    ProvenanceSlidedeck.prototype.startTime = function (slide) {
        var index = this._slides.indexOf(slide);
        var previousTime = 0;
        for (var i = 0; i < index; i++) {
            previousTime += this._slides[i].delay;
            previousTime += this._slides[i].duration;
        }
        return previousTime;
    };
    ProvenanceSlidedeck.prototype.slideAtTime = function (time) {
        var index = 0;
        var currentSlide = null;
        while (time >= 0 && index < this.slides.length) {
            currentSlide = this.slides[index];
            var nextSlideOffset = currentSlide.delay + currentSlide.duration;
            if (time - nextSlideOffset < 0) {
                break;
            }
            time -= nextSlideOffset;
            index++;
        }
        return currentSlide;
    };
    Object.defineProperty(ProvenanceSlidedeck.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeck.prototype, "graph", {
        get: function () {
            return this._graph;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeck.prototype.on = function (type, handler) {
        this._mitt.on(type, handler);
    };
    ProvenanceSlidedeck.prototype.off = function (type, handler) {
        this._mitt.off(type, handler);
    };
    return ProvenanceSlidedeck;
}());

var STATUS;
(function (STATUS) {
    STATUS[STATUS["IDLE"] = 0] = "IDLE";
    STATUS[STATUS["PLAYING"] = 1] = "PLAYING";
})(STATUS || (STATUS = {}));
var wait = function (duration) { return new Promise(function (resolve) { return setTimeout(resolve, duration); }); };
var ProvenanceSlidedeckPlayer = /** @class */ (function () {
    function ProvenanceSlidedeckPlayer(slides, selectCallback) {
        this._selectCallback = selectCallback;
        this._slides = slides;
        this._currentSlideIndex = 0;
        this._status = STATUS.IDLE;
    }
    ProvenanceSlidedeckPlayer.prototype.setSlideIndex = function (slideIndex) {
        this._currentSlideIndex = slideIndex;
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "slides", {
        get: function () {
            return this._slides;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "currentSlideIndex", {
        get: function () {
            return this._currentSlideIndex;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shouldPlayNext, slide;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldPlayNext = function () {
                            return _this._status === STATUS.PLAYING && _this._currentSlideIndex < _this._slides.length - 1;
                        };
                        if (!(this._status === STATUS.IDLE)) return [3 /*break*/, 4];
                        this._status = STATUS.PLAYING;
                        _a.label = 1;
                    case 1:
                        slide = this._slides[this._currentSlideIndex];
                        return [4 /*yield*/, wait(slide.duration)];
                    case 2:
                        _a.sent();
                        if (shouldPlayNext()) {
                            this._currentSlideIndex += 1;
                            this._selectCallback(this._slides[this._currentSlideIndex]);
                        }
                        _a.label = 3;
                    case 3:
                        if (shouldPlayNext()) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this._status = STATUS.IDLE;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ProvenanceSlidedeckPlayer.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidedeckPlayer.prototype.stop = function () {
        this._status = STATUS.IDLE;
    };
    return ProvenanceSlidedeckPlayer;
}());

function firstArgThis(f) {
    return function (...args) {
        return f(this, ...args);
    };
}
class SlideDeckVisualization {
    constructor(slideDeck, elm) {
        this._tableHeight = 1000;
        this._tableWidth = 300;
        this._minimumSlideDuration = 5000;
        this._barHeightTimeMultiplier = 0.01;
        this._barWidth = 270;
        this._barPadding = 5;
        this._resizebarheight = 5;
        this._previousSlideY = 0;
        this._lineX1 = 30;
        this._placeholderWidth = this._tableWidth - 40;
        this._placeholderY = 0;
        this._placeholderHeight = 40;
        this._maxSlides = 20;
        this._toolbarX = 200;
        this._toolbarY = 10;
        this._toolbarPadding = 20;
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
            const slide = new ProvenanceSlide(node.label, 1000, 0, [], node);
            slideDeck.addSlide(slide, slideDeck.selectedSlide
                ? slideDeck.slides.indexOf(slideDeck.selectedSlide) + 1
                : slideDeck.slides.length);
        };
        this.onClone = (slide) => {
            let slideDeck = this._slideDeck;
            const cloneSlide = new ProvenanceSlide(slide.name, 1000, 0, [], slide.node);
            slideDeck.addSlide(cloneSlide, slideDeck.selectedSlide
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
                    let previousSlideCenterY = this.previousSlidesHeight(previousSlide) +
                        this.barTotalHeight(previousSlide) / 2;
                    if (draggedY < previousSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex - 1);
                    }
                }
                else if (draggedY > originalY &&
                    myIndex < this._slideDeck.slides.length - 1) {
                    // check downwards
                    const nextSlide = this._slideDeck.slides[myIndex + 1];
                    let nextSlideCenterY = this.previousSlidesHeight(nextSlide) +
                        this.barTotalHeight(nextSlide) / 2;
                    if (draggedY > nextSlideCenterY) {
                        this._slideDeck.moveSlide(myIndex, myIndex + 1);
                    }
                }
                return "translate(30," + d3__WEBPACK_IMPORTED_MODULE_0__["event"].y + ")";
            });
        };
        this.moveDragended = (that, draggedObject) => {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(that)
                .classed("active", false)
                .attr("transform", (slide) => {
                return "translate(30," + this.previousSlidesHeight(slide) + ")";
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
            slide.duration =
                Math.max(0, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y) / this._barHeightTimeMultiplier;
            this.update();
        };
        this.durationSubject = (that, slide) => {
            return { y: this.barDurationHeight(slide) };
        };
        this._slideDeck = slideDeck;
        this._root = Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(elm);
        this._slideTable = this._root
            .append("svg")
            .attr("class", "slide__table")
            .attr("height", this._tableHeight)
            .attr("width", this._tableWidth);
        this._slideTable
            .append("rect")
            .attr("class", "slides_background_rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", this._tableHeight)
            .attr("width", this._tableWidth);
        this._slideTable
            .append("line")
            .attr("x1", this._lineX1)
            .attr("y1", 0)
            .attr("x2", this._lineX1)
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
        this._slideTable
            .append("rect")
            .attr("class", "slides_placeholder")
            .attr("x", this._lineX1 + this._barPadding)
            .attr("y", 0)
            .attr("width", this._placeholderWidth)
            .attr("height", this._placeholderHeight);
        this._slideTable
            .append("svg:foreignObject")
            .attr("class", "slide_add")
            .attr("x", (this._tableWidth - 40) / 2)
            .attr("cursor", "pointer")
            .attr("width", 30)
            .attr("height", 30)
            .append("xhtml:body")
            .on("click", this.onAdd)
            .html('<i class="fa fa-file-text-o"></i>');
        slideDeck.on("slideAdded", () => this.update());
        slideDeck.on("slideRemoved", () => this.update());
        slideDeck.on("slidesMoved", () => this.update());
        slideDeck.on("slideSelected", () => this.update());
        this.update();
    }
    onMouseEnter() {
        let toolbar = d3__WEBPACK_IMPORTED_MODULE_0__["event"].target.parentElement.querySelector(".slide_toolbar");
        toolbar.style.display = "block";
    }
    onMouseLeave() {
        let toolbar = d3__WEBPACK_IMPORTED_MODULE_0__["event"].target.parentElement.querySelector(".slide_toolbar");
        toolbar.style.display = "none";
    }
    moveDragStarted(draggedObject) {
        Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
            .raise()
            .classed("active", true);
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
        let calculatedHeight = this.barDelayHeight(slide) +
            this.barDurationHeight(slide) +
            2 * this._resizebarheight;
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
            this._timeIndexedSlides.push({
                slide: slide,
                startTime: timeIndex
            });
            timeIndex += slide.delay + slide.duration;
        });
    }
    update() {
        this.updateTimeIndices(this._slideDeck);
        const allExistingNodes = this._slideTable
            .selectAll("g.slide")
            .data(this._slideDeck.slides, (d) => {
            return d.id;
        });
        const newNodes = allExistingNodes
            .enter()
            .append("g")
            .attr("class", "slide")
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .clickDistance([2, 2])
            .on("start", this.moveDragStarted)
            .on("drag", firstArgThis(this.moveDragged))
            .on("end", firstArgThis(this.moveDragended)));
        newNodes
            .append("rect")
            .attr("class", "slides_delay_resize")
            .attr("x", this._barPadding)
            .attr("width", this._barWidth - 2 * this._barPadding)
            .attr("height", this._resizebarheight)
            .attr("cursor", "ns-resize")
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .subject(firstArgThis(this.delaySubject))
            .on("drag", firstArgThis(this.delayDragged)));
        newNodes
            .append("rect")
            .attr("class", "slides_delay_rect")
            .attr("x", this._barPadding)
            .attr("y", 0)
            .attr("width", this._barWidth - 2 * this._barPadding)
            .on("click", this.onSelect);
        let slideGroup = newNodes
            .append("g")
            .attr("transform", "translate(5,0)")
            .attr("class", "slide_group")
            .on("mouseenter", this.onMouseEnter)
            .on("mouseleave", this.onMouseLeave);
        slideGroup
            .append("rect")
            .attr("class", "slides_rect")
            .attr("width", this._barWidth - 2 * this._barPadding)
            .attr("cursor", "move")
            .on("click", this.onSelect);
        slideGroup
            .append("text")
            .attr("class", "slides_text")
            .attr("x", 2 * this._barPadding)
            .attr("dy", ".35em");
        slideGroup
            .append("text")
            .attr("class", "slides_delaytext")
            .attr("x", 2 * this._barPadding)
            .attr("dy", ".35em");
        let toolbar = slideGroup.append("g").attr("class", "slide_toolbar");
        toolbar
            .append("svg:foreignObject")
            .attr("class", "slides_delete_icon")
            .attr("x", this._toolbarX)
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onDelete)
            .html('<i class="fa fa-trash-o"></i>');
        toolbar
            .append("svg:foreignObject")
            .attr("class", "slides_clone_icon")
            .attr("x", this._toolbarX + this._toolbarPadding)
            .attr("cursor", "pointer")
            .attr("width", 20)
            .attr("height", 20)
            .append("xhtml:body")
            .on("click", this.onClone)
            .html('<i class="fa fa-copy"></i>');
        const placeholder = this._slideTable.select("rect.slides_placeholder");
        newNodes
            .append("text")
            .attr("class", "slides_durationtext")
            .attr("x", this._barPadding - 30)
            .attr("dy", "-.65em");
        newNodes
            .append("circle")
            .attr("class", "time")
            .attr("cx", 0)
            .attr("r", 3)
            .attr("fill", "black");
        newNodes
            .append("rect")
            .attr("class", "slides_duration_resize")
            .attr("x", this._barPadding)
            .attr("width", this._barWidth - 2 * this._barPadding)
            .attr("height", this._resizebarheight)
            .attr("cursor", "ns-resize")
            .call(Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .subject(firstArgThis(this.durationSubject))
            .on("drag", firstArgThis(this.durationDragged)));
        // Update all nodes
        const allNodes = newNodes
            .merge(allExistingNodes)
            .attr("transform", (slide) => {
            this._previousSlideY = this.previousSlidesHeight(slide);
            return "translate(30," + this.previousSlidesHeight(slide) + ")";
        });
        allNodes
            .select("rect.slides_delay_rect")
            .attr("height", (slide) => {
            return this.barDelayHeight(slide);
        });
        allNodes
            .select("rect.slides_delay_resize")
            .attr("y", (slide) => {
            return this.barDelayHeight(slide);
        });
        slideGroup = allNodes.select("g.slide_group");
        slideGroup
            .select("rect.slides_rect")
            .attr("selected", (slide) => {
            return this._slideDeck.selectedSlide === slide;
        })
            .attr("y", (slide) => {
            return this.barDelayHeight(slide) + this._resizebarheight;
        })
            .attr("height", (slide) => {
            this._placeholderY =
                this._previousSlideY + this.barDurationHeight(slide);
            return this.barDurationHeight(slide);
        });
        toolbar = allNodes.select("g.slide_toolbar");
        toolbar
            .select("foreignObject.slides_delete_icon")
            .attr("y", (slide) => {
            return this._toolbarY;
        });
        toolbar
            .select("foreignObject.slides_clone_icon")
            .attr("y", (slide) => {
            return this._toolbarY;
        });
        slideGroup
            .select("text.slides_text")
            .attr("y", (slide) => {
            return (this.barDelayHeight(slide) +
                this._resizebarheight +
                2 * this._barPadding);
        })
            .text((slide) => {
            return slide.name;
        });
        slideGroup
            .select("text.slides_delaytext")
            .attr("y", (slide) => {
            return (this.barDelayHeight(slide) +
                this._resizebarheight +
                1 * this._barPadding +
                25);
        })
            .text((slide) => {
            return "transition: " + slide.delay / 1000;
        });
        allNodes.select("circle.time").attr("cy", (slide) => {
            return this.barDelayHeight(slide) + this._resizebarheight;
        });
        allNodes
            .select("rect.slides_duration_resize")
            .attr("y", (slide) => {
            return this.barTotalHeight(slide) - this._resizebarheight;
        });
        allNodes
            .select("text.slides_durationtext")
            .attr("y", (slide) => {
            return (this.barDelayHeight(slide) +
                this._resizebarheight +
                4 * this._barPadding -
                7);
        })
            .text((slide) => {
            return slide.duration / 1000;
        });
        placeholder.attr("y", this._placeholderY + 20);
        this._slideTable.select("line").attr("y2", this._placeholderY + 20);
        this._slideTable
            .select("foreignObject.slide_add")
            .attr("y", this._placeholderY + 30);
        allExistingNodes.exit().remove();
    }
}


//# sourceMappingURL=slide-deck-visualization.es5.js.map


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

/***/ "./src/app/annotate.ts":
/*!*****************************!*\
  !*** ./src/app/annotate.ts ***!
  \*****************************/
/*! exports provided: registry, Annotator, registerAnnotator, fromScreenCoordinates, toScreenCoordinates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registry", function() { return registry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Annotator", function() { return Annotator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerAnnotator", function() { return registerAnnotator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScreenCoordinates", function() { return fromScreenCoordinates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toScreenCoordinates", function() { return toScreenCoordinates; });
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/* todo: move to core?
   Use this file to register annotators, e.g. function that determine
   if annotations can be anchored, and how to transform between
   coordinates systems
 */
var registry = [];
var Annotator = /** @class */ (function () {
    function Annotator(init) {
        Object.assign(this, init);
    }
    return Annotator;
}());

var registerAnnotator = function (annotator) {
    registry.push(annotator);
};
var fromScreenCoordinates = function (coords) {
    for (var _i = 0, registry_1 = registry; _i < registry_1.length; _i++) {
        var annotator = registry_1[_i];
        var annotatedCoords = annotator.fromScreenCoordinates(coords);
        if (annotatedCoords) {
            return annotatedCoords;
        }
    }
};
var toScreenCoordinates = function (coords) {
    for (var _i = 0, registry_2 = registry; _i < registry_2.length; _i++) {
        var annotator = registry_2[_i];
        if (annotator.name === coords.name) {
            return annotator.toScreenCoordinates(coords);
        }
    }
};
registerAnnotator(new Annotator({
    name: 'dummyAnnotator',
    fromScreenCoordinates: function (coords) { return (__assign({}, coords, { name: 'dummyAnnotator' })); },
    toScreenCoordinates: function (_a) {
        var x = _a.x, y = _a.y;
        return ({ x: x, y: y });
    }
}));


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

module.exports = "<mat-sidenav-container hasBackdrop=\"false\">\n  <mat-sidenav position=\"end\" #sidenav mode=\"over\" [opened]=\"false\" hasBackdrop=\"false\">\n    <button id=\"sidenav-trigger\" color=\"primary\" style=\"color: white\" mat-icon-button (click)=\"sidenav.toggle()\">\n      <mat-icon>menu</mat-icon>\n    </button>\n\n    <!-- Sidenav content -->\n    <app-provenance-visualization></app-provenance-visualization>\n    <app-provenance-slides #slides></app-provenance-slides>\n  </mat-sidenav>\n\n\n  <mat-sidenav-content>\n    <app-brainvis-canvas #canvas></app-brainvis-canvas>\n    <div id=\"bottom-container\">\n      <app-brainvis-canvas-controls [canvas]=\"canvas\"></app-brainvis-canvas-controls>\n    </div>\n    <app-slide-annotations id=\"annotation-overlay\" [slides]=\"slides\">\n      bladiebla\n    </app-slide-annotations>\n    <!--<p><mat-slide-toggle>sidenav.opened</mat-slide-toggle></p>-->\n    <!--<p></p>-->\n  </mat-sidenav-content>\n</mat-sidenav-container>\n"

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
/* harmony import */ var _slide_annotations_slide_annotations_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./slide-annotations/slide-annotations.component */ "./src/app/slide-annotations/slide-annotations.component.ts");
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
                _provenance_slides_provenance_slides_component__WEBPACK_IMPORTED_MODULE_10__["ProvenanceSlidesComponent"],
                _slide_annotations_slide_annotations_component__WEBPACK_IMPORTED_MODULE_11__["SlideAnnotationsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
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

module.exports = "<mat-slide-toggle [(ngModel)]=\"canvas.showSliceHandle\">\n  Show slice handle\n</mat-slide-toggle>\n<mat-slide-toggle [(ngModel)]=\"canvas.showSlice\">\n  Show slice\n</mat-slide-toggle>\n<mat-slide-toggle [(ngModel)]=\"canvas.showObjects\">\n  Show segmented objects\n</mat-slide-toggle>\n<div>\n  <button mat-button color=\"primary\" id=\"alignButton\">Align to slice</button>\n</div>\n\n"

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








// import AnnotationAnchorSelector from './annotationAnchorSelector';
// import AnnotationAnchor from './annotationAnchor';



var BrainvisCanvasComponent = /** @class */ (function (_super) {
    __extends(BrainvisCanvasComponent, _super);
    function BrainvisCanvasComponent(elem, provenance) {
        var _this = _super.call(this) || this;
        _this._showSlice = true;
        _this._showSliceHandle = true;
        _this._showObjects = true;
        _this.showSliceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.showSliceHandleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.showObjectsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.selectedObjectsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
                _this.alignButton.value = 'Align to slice';
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
        // private annotationAnchorSelector: AnnotationAnchorSelector;
        set: function (showSlice) {
            this._showSlice = showSlice;
            this.toggleSlice(showSlice);
            this.showSliceChange.emit(showSlice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrainvisCanvasComponent.prototype, "showSliceHandle", {
        get: function () { return this._showSliceHandle; },
        set: function (showSliceHandle) {
            this._showSliceHandle = showSliceHandle;
            this.toggleSliceHandle(showSliceHandle);
            this.showSliceHandleChange.emit(showSliceHandle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrainvisCanvasComponent.prototype, "showObjects", {
        get: function () { return this._showObjects; },
        set: function (showObjects) {
            this._showObjects = showObjects;
            this.toggleObjects(showObjects);
            this.showObjectsChange.emit(showObjects);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrainvisCanvasComponent.prototype, "selectedObjects", {
        get: function () { return this.objectSelector.getObjects(); },
        set: function (newSelectedObjects) {
            var oldSelectedObjects = this.objectSelector.getObjects();
            this.objectSelector.setSelection(newSelectedObjects);
            this.selectedObjectsChange.emit([newSelectedObjects, oldSelectedObjects]);
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
        this.objectSelector = new _objectSelector__WEBPACK_IMPORTED_MODULE_7__["default"](this.objects);
        // this.annotationAnchorSelector = new AnnotationAnchorSelector(this.objects);
        this.intersectionManager = new _intersectionManager__WEBPACK_IMPORTED_MODULE_6__["IntersectionManager"](this.renderer.domElement, this.camera);
        this.intersectionManager.addListener(this.objectSelector);
        // this.intersectionManager.addListener(this.annotationAnchorSelector);
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
            // tslint:disable-next-line
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
            this.sliceManipulator.addEventListener('zoomChange', this.onSlicePlaneZoomChange);
            this.sliceManipulator.addEventListener('orientationChange', this.onSlicePlaneOrientationChange);
            this.sliceManipulator.visible = this._showSliceHandle;
            this.intersectionManager.addListener(this.sliceManipulator);
            // Annotation Anchor(s)
            // this.anchorDummy = new AnnotationAnchor(this.renderer.domElement, this.camera);
            // this.scene.add(this.anchorDummy);
            // this.anchorDummy.visible = true;
            // this.intersectionManager.addListener(this.anchorDummy);
            this.controls.initEventListeners();
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
            _this.selectedObjects = event.newObject;
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
    BrainvisCanvasComponent.prototype.setSlicePlaneZoom = function (positions, within) {
        if (this.stackHelper) {
            this.sliceManipulator.changeSlicePosition(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](positions.position[0], positions.position[1], positions.position[2]), new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](positions.direction[0], positions.direction[1], positions.direction[2]), within > 0 ? within : 1000);
        }
    };
    BrainvisCanvasComponent.prototype.toggleSlice = function (state) {
        if (this.stackHelper) {
            this.stackHelper._slice.visible = state;
            this.stackHelper._border.visible = state;
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
        }
    };
    BrainvisCanvasComponent.prototype.toggleObjects = function (visible) {
        this.objects.visible = visible;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showSlice", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "showSliceChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showSliceHandle", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "showSliceHandleChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BrainvisCanvasComponent.prototype, "showObjects", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "showObjectsChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], BrainvisCanvasComponent.prototype, "selectedObjects", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], BrainvisCanvasComponent.prototype, "selectedObjectsChange", void 0);
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
    Special class to manage intersection with goemetry.
    Subsystems can register to be tested for intersections.
    All subsytems gets mouse up/down/move and intersection information.
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
        if (intersection !== undefined &&
            this.previousSelectedObject !== intersection.object &&
            intersection.object instanceof three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]) {
            var asMesh = intersection.object;
            if (asMesh.material instanceof three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]) {
                var previousName = '';
                var asMeshPongMaterial = null;
                if (this.previousSelectedObject) {
                    asMeshPongMaterial = this.previousSelectedObject.material;
                    asMeshPongMaterial.color.setHex(this.previousColor);
                    previousName = this.previousSelectedObject.name;
                }
                asMeshPongMaterial = asMesh.material;
                this.previousSelectedObject = asMesh;
                this.previousColor = asMeshPongMaterial.color.getHex();
                asMeshPongMaterial.color.setHex(0x0000ff);
                this.dispatchEvent({
                    type: 'objectSelection',
                    newObject: asMesh
                });
            }
        }
        else if (this.previousSelectedObject) {
            var asMeshPongMaterial = this.previousSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.dispatchEvent({
                type: 'objectSelection',
                newObject: undefined
            });
            this.previousSelectedObject = undefined;
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
        var objectToSelect = null;
        if (newSelection instanceof Array) {
            newSelection = newSelection[0];
        }
        for (var _i = 0, _a = this.objects.children; _i < _a.length; _i++) {
            var object = _a[_i];
            if (newSelection && object.name === newSelection.name) {
                objectToSelect = object;
                break;
            }
        }
        if (this.previousSelectedObject) {
            var asMeshPongMaterial = this.previousSelectedObject.material;
            asMeshPongMaterial.color.setHex(this.previousColor);
            this.previousSelectedObject = undefined;
        }
        if (objectToSelect) {
            var asMesh = objectToSelect;
            if (asMesh.material instanceof three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]) {
                var asMeshPongMaterial = asMesh.material;
                this.previousSelectedObject = asMesh;
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
    setControlOrientation: function (args) { return Promise.resolve(canvas.setControlOrientation(args, 500)); },
    setSlicePlaneOrientation: function (position, direction) { return Promise.resolve(canvas.setSlicePlanePosition({ position: position, direction: direction }, 500)); },
    setSlicePlaneZoom: function (position, direction) { return Promise.resolve(canvas.setSlicePlaneZoom({ position: position, direction: direction }, 500)); },
    showSlice: function (value) { return Promise.resolve(canvas.showSlice = value); },
    showObjects: function (value) { return Promise.resolve(canvas.showObjects = value); },
    showSliceHandle: function (value) { return Promise.resolve(canvas.showSliceHandle = value); },
    showSegmentedObjects: function (value) { return Promise.resolve(canvas.showObjects = value); },
    selectedObjects: function (value) { return Promise.resolve(canvas.selectedObjects = value); },
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
                metadata: { userIntent: 'exploration' },
                do: 'setControlOrientation',
                doArguments: [event.orientation],
                undo: 'setControlOrientation',
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
                metadata: {
                    userIntent: 'exploration',
                    value: event.orientation
                },
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
        tracker.applyAction({
            metadata: { userIntent: 'exploration' },
            do: 'setSlicePlaneOrientation',
            doArguments: [position, direction],
            undo: 'setSlicePlaneOrientation',
            undoArguments: [oldPosition, oldDirection],
        });
    });
    canvas.addEventListener('sliceZoomChanged', function (event) {
        var _a = event.changes, position = _a.position, direction = _a.direction, oldPosition = _a.oldPosition, oldDirection = _a.oldDirection;
        tracker.applyAction({
            metadata: { userIntent: 'exploration' },
            do: 'setSlicePlaneZoom',
            doArguments: [position, direction],
            undo: 'setSlicePlaneZoom',
            undoArguments: [oldPosition, oldDirection],
        });
    });
    canvas.showSliceChange.subscribe(function (val) {
        tracker.applyAction({
            metadata: { userIntent: 'configuration' },
            do: 'showSlice',
            doArguments: [val],
            undo: 'showSlice',
            undoArguments: [!val],
        }, true);
    });
    canvas.showSliceHandleChange.subscribe(function (val) {
        tracker.applyAction({
            metadata: { userIntent: 'configuration' },
            do: 'showSliceHandle',
            doArguments: [val],
            undo: 'showSliceHandle',
            undoArguments: [!val],
        }, true);
    });
    canvas.showObjectsChange.subscribe(function (val) {
        tracker.applyAction({
            metadata: { userIntent: 'configuration' },
            do: 'showObjects',
            doArguments: [val],
            undo: 'showObjects',
            undoArguments: [!val],
        }, true);
    });
    canvas.selectedObjectsChange.subscribe(function (_a) {
        var newObjects = _a[0], oldObjects = _a[1];
        tracker.applyAction({
            metadata: { userIntent: 'selection' },
            do: 'selectedObjects',
            doArguments: [newObjects],
            undo: 'selectedObjects',
            undoArguments: [oldObjects],
        }, true);
    });
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
            // cancel previous animation
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
 * @author Eberhard Graether / http:// egraether.com/
 * @author Mark Lundin  / http:// mark-lundin.com
 * @author Simone Manini / http:// daron1337.github.io
 * @author Luca Antiga  / http:// lantiga.github.io
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
        //  internals
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
            _this.dispatchEvent({
                type: 'end',
                state: previousState,
                newTarget: _this.target,
                newPosition: _this.camera.position,
                newUp: _this.camera.up
            });
        };
        _this.mousewheel = function (event) {
            if (_this.enabled === false) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            var delta = 0;
            if (event.wheelDelta) {
                //  WebKit / Opera / Explorer 9
                delta = event.wheelDelta / 40;
            }
            else if (event.detail) {
                //  Firefox
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
        //  for reset
        _this.target0 = _this.target.clone();
        _this.position0 = _this.camera.position.clone();
        _this.up0 = _this.camera.up.clone();
        _this.domElement.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        }, false);
        _this.handleResize();
        _this.init();
        //  force an update at start
        _this.update();
        return _this;
    }
    Trackball.prototype.initEventListeners = function () {
        this.domElement.addEventListener('mousedown', this.mousedown, false);
        document.addEventListener('mousemove', this.mousemove, false);
        document.addEventListener('mouseup', this.mouseup, false);
        this.domElement.addEventListener('mousewheel', this.mousewheel, false);
        this.domElement.addEventListener('DOMMouseScroll', this.mousewheel, false); //  firefox
        this.domElement.addEventListener('touchstart', this.touchstart, false);
        this.domElement.addEventListener('touchend', this.touchend, false);
        this.domElement.addEventListener('touchmove', this.touchmove, false);
        window.addEventListener('keydown', this.keydown, false);
        window.addEventListener('keyup', this.keyup, false);
    };
    //  methods
    Trackball.prototype.handleResize = function () {
        if (this.domElement === document) {
            this.screen.left = 0;
            this.screen.top = 0;
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;
        }
        else {
            var box = this.domElement.getBoundingClientRect();
            //  adjustments come from similar code in the jquery offset() function
            var d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;
        }
    };
    Trackball.prototype.handleEvent = function (event) {
        if (typeof this[event.type] === 'function') {
            this[event.type](event);
        }
    };
    Trackball.prototype.getMouseOnScreen = function (pageX, pageY) {
        return new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]((pageX - this.screen.left) / this.screen.width, (pageY - this.screen.top) / this.screen.height);
    };
    Trackball.prototype.getMouseOnCircle = function (pageX, pageY) {
        return new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)), ((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width) //  screen.width intentional
        );
    };
    Trackball.prototype.zoomCamera = function () {
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
    Trackball.prototype.init = function () {
        this.rotateCamera();
        this.panCamera();
    };
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
            // _this.dispatchEvent(changeEvent);
            this.lastPosition.copy(this.camera.position);
        }
        else {
            // cancel previous animation
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
                var interPolateTime = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; //  ease in/out function
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
                    // console.log('end anim');
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
    Trackball.prototype.reset = function () {
        this.changeCamera(this.target0, this.position0, this.up0, 0);
        this.dispatchEvent({ type: 'change' });
    };
    Trackball.prototype.setState = function (targetState) {
        this.forceState = targetState;
        this.previousState = targetState;
        this.state = targetState;
    };
    Trackball.prototype.custom = function (customStart, customEnd) {
        // TODO Nothing yet
    };
    //  listeners
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
        var x, y;
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
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this.panStart.copy(this.getMouseOnScreen(x, y));
                    this.panEnd.copy(this.panStart);
                    break;
                default:
                    this.state = STATE.NONE;
            }
        }
        else {
            //  { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
            switch (this.state) {
                case 0:
                    //  1 or 2 fingers, smae behavior
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
                        x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                        y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                        this.panStart.copy(this.getMouseOnScreen(x, y));
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
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
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
            //  { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4, CUSTOM: 99 };
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
                    //  2 fingers!
                    //  TOUCH ZOOM
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    this.touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    break;
                case 5:
                    //  2 fingers
                    //  TOUCH_PAN
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
        var x, y;
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
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
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
                    //  TOUCH ZOOM
                    this.touchZoomDistanceStart = this.touchZoomDistanceEnd = 0;
                    this.state = STATE.ZOOM;
                    break;
                case 5:
                    //  TOUCH ZOOM
                    if (event.touches.length >= 2) {
                        x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                        y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                        this.panEnd.copy(this.getMouseOnScreen(x, y));
                        this.panStart.copy(this.panEnd);
                    }
                    this.state = STATE.PAN;
                    break;
                case 99:
                    x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
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

module.exports = "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('fontawesome-webfont.eot?v=4.7.0');\n  src: url('fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('fontawesome-webfont.woff?v=4.7.0') format('woff'), url('fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  -webkit-filter: none;\n          filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #ffffff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\f000\";\n}\n.fa-music:before {\n  content: \"\\f001\";\n}\n.fa-search:before {\n  content: \"\\f002\";\n}\n.fa-envelope-o:before {\n  content: \"\\f003\";\n}\n.fa-heart:before {\n  content: \"\\f004\";\n}\n.fa-star:before {\n  content: \"\\f005\";\n}\n.fa-star-o:before {\n  content: \"\\f006\";\n}\n.fa-user:before {\n  content: \"\\f007\";\n}\n.fa-film:before {\n  content: \"\\f008\";\n}\n.fa-th-large:before {\n  content: \"\\f009\";\n}\n.fa-th:before {\n  content: \"\\f00a\";\n}\n.fa-th-list:before {\n  content: \"\\f00b\";\n}\n.fa-check:before {\n  content: \"\\f00c\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\f00d\";\n}\n.fa-search-plus:before {\n  content: \"\\f00e\";\n}\n.fa-search-minus:before {\n  content: \"\\f010\";\n}\n.fa-power-off:before {\n  content: \"\\f011\";\n}\n.fa-signal:before {\n  content: \"\\f012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\f013\";\n}\n.fa-trash-o:before {\n  content: \"\\f014\";\n}\n.fa-home:before {\n  content: \"\\f015\";\n}\n.fa-file-o:before {\n  content: \"\\f016\";\n}\n.fa-clock-o:before {\n  content: \"\\f017\";\n}\n.fa-road:before {\n  content: \"\\f018\";\n}\n.fa-download:before {\n  content: \"\\f019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\f01a\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\f01b\";\n}\n.fa-inbox:before {\n  content: \"\\f01c\";\n}\n.fa-play-circle-o:before {\n  content: \"\\f01d\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\f01e\";\n}\n.fa-refresh:before {\n  content: \"\\f021\";\n}\n.fa-list-alt:before {\n  content: \"\\f022\";\n}\n.fa-lock:before {\n  content: \"\\f023\";\n}\n.fa-flag:before {\n  content: \"\\f024\";\n}\n.fa-headphones:before {\n  content: \"\\f025\";\n}\n.fa-volume-off:before {\n  content: \"\\f026\";\n}\n.fa-volume-down:before {\n  content: \"\\f027\";\n}\n.fa-volume-up:before {\n  content: \"\\f028\";\n}\n.fa-qrcode:before {\n  content: \"\\f029\";\n}\n.fa-barcode:before {\n  content: \"\\f02a\";\n}\n.fa-tag:before {\n  content: \"\\f02b\";\n}\n.fa-tags:before {\n  content: \"\\f02c\";\n}\n.fa-book:before {\n  content: \"\\f02d\";\n}\n.fa-bookmark:before {\n  content: \"\\f02e\";\n}\n.fa-print:before {\n  content: \"\\f02f\";\n}\n.fa-camera:before {\n  content: \"\\f030\";\n}\n.fa-font:before {\n  content: \"\\f031\";\n}\n.fa-bold:before {\n  content: \"\\f032\";\n}\n.fa-italic:before {\n  content: \"\\f033\";\n}\n.fa-text-height:before {\n  content: \"\\f034\";\n}\n.fa-text-width:before {\n  content: \"\\f035\";\n}\n.fa-align-left:before {\n  content: \"\\f036\";\n}\n.fa-align-center:before {\n  content: \"\\f037\";\n}\n.fa-align-right:before {\n  content: \"\\f038\";\n}\n.fa-align-justify:before {\n  content: \"\\f039\";\n}\n.fa-list:before {\n  content: \"\\f03a\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\f03b\";\n}\n.fa-indent:before {\n  content: \"\\f03c\";\n}\n.fa-video-camera:before {\n  content: \"\\f03d\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\f03e\";\n}\n.fa-pencil:before {\n  content: \"\\f040\";\n}\n.fa-map-marker:before {\n  content: \"\\f041\";\n}\n.fa-adjust:before {\n  content: \"\\f042\";\n}\n.fa-tint:before {\n  content: \"\\f043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\f044\";\n}\n.fa-share-square-o:before {\n  content: \"\\f045\";\n}\n.fa-check-square-o:before {\n  content: \"\\f046\";\n}\n.fa-arrows:before {\n  content: \"\\f047\";\n}\n.fa-step-backward:before {\n  content: \"\\f048\";\n}\n.fa-fast-backward:before {\n  content: \"\\f049\";\n}\n.fa-backward:before {\n  content: \"\\f04a\";\n}\n.fa-play:before {\n  content: \"\\f04b\";\n}\n.fa-pause:before {\n  content: \"\\f04c\";\n}\n.fa-stop:before {\n  content: \"\\f04d\";\n}\n.fa-forward:before {\n  content: \"\\f04e\";\n}\n.fa-fast-forward:before {\n  content: \"\\f050\";\n}\n.fa-step-forward:before {\n  content: \"\\f051\";\n}\n.fa-eject:before {\n  content: \"\\f052\";\n}\n.fa-chevron-left:before {\n  content: \"\\f053\";\n}\n.fa-chevron-right:before {\n  content: \"\\f054\";\n}\n.fa-plus-circle:before {\n  content: \"\\f055\";\n}\n.fa-minus-circle:before {\n  content: \"\\f056\";\n}\n.fa-times-circle:before {\n  content: \"\\f057\";\n}\n.fa-check-circle:before {\n  content: \"\\f058\";\n}\n.fa-question-circle:before {\n  content: \"\\f059\";\n}\n.fa-info-circle:before {\n  content: \"\\f05a\";\n}\n.fa-crosshairs:before {\n  content: \"\\f05b\";\n}\n.fa-times-circle-o:before {\n  content: \"\\f05c\";\n}\n.fa-check-circle-o:before {\n  content: \"\\f05d\";\n}\n.fa-ban:before {\n  content: \"\\f05e\";\n}\n.fa-arrow-left:before {\n  content: \"\\f060\";\n}\n.fa-arrow-right:before {\n  content: \"\\f061\";\n}\n.fa-arrow-up:before {\n  content: \"\\f062\";\n}\n.fa-arrow-down:before {\n  content: \"\\f063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\f064\";\n}\n.fa-expand:before {\n  content: \"\\f065\";\n}\n.fa-compress:before {\n  content: \"\\f066\";\n}\n.fa-plus:before {\n  content: \"\\f067\";\n}\n.fa-minus:before {\n  content: \"\\f068\";\n}\n.fa-asterisk:before {\n  content: \"\\f069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\f06a\";\n}\n.fa-gift:before {\n  content: \"\\f06b\";\n}\n.fa-leaf:before {\n  content: \"\\f06c\";\n}\n.fa-fire:before {\n  content: \"\\f06d\";\n}\n.fa-eye:before {\n  content: \"\\f06e\";\n}\n.fa-eye-slash:before {\n  content: \"\\f070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\f071\";\n}\n.fa-plane:before {\n  content: \"\\f072\";\n}\n.fa-calendar:before {\n  content: \"\\f073\";\n}\n.fa-random:before {\n  content: \"\\f074\";\n}\n.fa-comment:before {\n  content: \"\\f075\";\n}\n.fa-magnet:before {\n  content: \"\\f076\";\n}\n.fa-chevron-up:before {\n  content: \"\\f077\";\n}\n.fa-chevron-down:before {\n  content: \"\\f078\";\n}\n.fa-retweet:before {\n  content: \"\\f079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.fa-folder:before {\n  content: \"\\f07b\";\n}\n.fa-folder-open:before {\n  content: \"\\f07c\";\n}\n.fa-arrows-v:before {\n  content: \"\\f07d\";\n}\n.fa-arrows-h:before {\n  content: \"\\f07e\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\f080\";\n}\n.fa-twitter-square:before {\n  content: \"\\f081\";\n}\n.fa-facebook-square:before {\n  content: \"\\f082\";\n}\n.fa-camera-retro:before {\n  content: \"\\f083\";\n}\n.fa-key:before {\n  content: \"\\f084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\f085\";\n}\n.fa-comments:before {\n  content: \"\\f086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\f087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\f088\";\n}\n.fa-star-half:before {\n  content: \"\\f089\";\n}\n.fa-heart-o:before {\n  content: \"\\f08a\";\n}\n.fa-sign-out:before {\n  content: \"\\f08b\";\n}\n.fa-linkedin-square:before {\n  content: \"\\f08c\";\n}\n.fa-thumb-tack:before {\n  content: \"\\f08d\";\n}\n.fa-external-link:before {\n  content: \"\\f08e\";\n}\n.fa-sign-in:before {\n  content: \"\\f090\";\n}\n.fa-trophy:before {\n  content: \"\\f091\";\n}\n.fa-github-square:before {\n  content: \"\\f092\";\n}\n.fa-upload:before {\n  content: \"\\f093\";\n}\n.fa-lemon-o:before {\n  content: \"\\f094\";\n}\n.fa-phone:before {\n  content: \"\\f095\";\n}\n.fa-square-o:before {\n  content: \"\\f096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\f097\";\n}\n.fa-phone-square:before {\n  content: \"\\f098\";\n}\n.fa-twitter:before {\n  content: \"\\f099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\f09a\";\n}\n.fa-github:before {\n  content: \"\\f09b\";\n}\n.fa-unlock:before {\n  content: \"\\f09c\";\n}\n.fa-credit-card:before {\n  content: \"\\f09d\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\f09e\";\n}\n.fa-hdd-o:before {\n  content: \"\\f0a0\";\n}\n.fa-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.fa-bell:before {\n  content: \"\\f0f3\";\n}\n.fa-certificate:before {\n  content: \"\\f0a3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\f0a4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\f0a5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\f0a6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\f0a7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\f0a8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\f0a9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\f0aa\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\f0ab\";\n}\n.fa-globe:before {\n  content: \"\\f0ac\";\n}\n.fa-wrench:before {\n  content: \"\\f0ad\";\n}\n.fa-tasks:before {\n  content: \"\\f0ae\";\n}\n.fa-filter:before {\n  content: \"\\f0b0\";\n}\n.fa-briefcase:before {\n  content: \"\\f0b1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\f0b2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\f0c0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\f0c1\";\n}\n.fa-cloud:before {\n  content: \"\\f0c2\";\n}\n.fa-flask:before {\n  content: \"\\f0c3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\f0c4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\f0c5\";\n}\n.fa-paperclip:before {\n  content: \"\\f0c6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\f0c7\";\n}\n.fa-square:before {\n  content: \"\\f0c8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\f0c9\";\n}\n.fa-list-ul:before {\n  content: \"\\f0ca\";\n}\n.fa-list-ol:before {\n  content: \"\\f0cb\";\n}\n.fa-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.fa-underline:before {\n  content: \"\\f0cd\";\n}\n.fa-table:before {\n  content: \"\\f0ce\";\n}\n.fa-magic:before {\n  content: \"\\f0d0\";\n}\n.fa-truck:before {\n  content: \"\\f0d1\";\n}\n.fa-pinterest:before {\n  content: \"\\f0d2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\f0d3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\f0d4\";\n}\n.fa-google-plus:before {\n  content: \"\\f0d5\";\n}\n.fa-money:before {\n  content: \"\\f0d6\";\n}\n.fa-caret-down:before {\n  content: \"\\f0d7\";\n}\n.fa-caret-up:before {\n  content: \"\\f0d8\";\n}\n.fa-caret-left:before {\n  content: \"\\f0d9\";\n}\n.fa-caret-right:before {\n  content: \"\\f0da\";\n}\n.fa-columns:before {\n  content: \"\\f0db\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\f0dc\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\f0dd\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\f0de\";\n}\n.fa-envelope:before {\n  content: \"\\f0e0\";\n}\n.fa-linkedin:before {\n  content: \"\\f0e1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\f0e2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\f0e3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\f0e4\";\n}\n.fa-comment-o:before {\n  content: \"\\f0e5\";\n}\n.fa-comments-o:before {\n  content: \"\\f0e6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\f0e7\";\n}\n.fa-sitemap:before {\n  content: \"\\f0e8\";\n}\n.fa-umbrella:before {\n  content: \"\\f0e9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\f0ea\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\f0eb\";\n}\n.fa-exchange:before {\n  content: \"\\f0ec\";\n}\n.fa-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.fa-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.fa-user-md:before {\n  content: \"\\f0f0\";\n}\n.fa-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.fa-suitcase:before {\n  content: \"\\f0f2\";\n}\n.fa-bell-o:before {\n  content: \"\\f0a2\";\n}\n.fa-coffee:before {\n  content: \"\\f0f4\";\n}\n.fa-cutlery:before {\n  content: \"\\f0f5\";\n}\n.fa-file-text-o:before {\n  content: \"\\f0f6\";\n}\n.fa-building-o:before {\n  content: \"\\f0f7\";\n}\n.fa-hospital-o:before {\n  content: \"\\f0f8\";\n}\n.fa-ambulance:before {\n  content: \"\\f0f9\";\n}\n.fa-medkit:before {\n  content: \"\\f0fa\";\n}\n.fa-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.fa-beer:before {\n  content: \"\\f0fc\";\n}\n.fa-h-square:before {\n  content: \"\\f0fd\";\n}\n.fa-plus-square:before {\n  content: \"\\f0fe\";\n}\n.fa-angle-double-left:before {\n  content: \"\\f100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\f101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\f102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\f103\";\n}\n.fa-angle-left:before {\n  content: \"\\f104\";\n}\n.fa-angle-right:before {\n  content: \"\\f105\";\n}\n.fa-angle-up:before {\n  content: \"\\f106\";\n}\n.fa-angle-down:before {\n  content: \"\\f107\";\n}\n.fa-desktop:before {\n  content: \"\\f108\";\n}\n.fa-laptop:before {\n  content: \"\\f109\";\n}\n.fa-tablet:before {\n  content: \"\\f10a\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\f10b\";\n}\n.fa-circle-o:before {\n  content: \"\\f10c\";\n}\n.fa-quote-left:before {\n  content: \"\\f10d\";\n}\n.fa-quote-right:before {\n  content: \"\\f10e\";\n}\n.fa-spinner:before {\n  content: \"\\f110\";\n}\n.fa-circle:before {\n  content: \"\\f111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\f112\";\n}\n.fa-github-alt:before {\n  content: \"\\f113\";\n}\n.fa-folder-o:before {\n  content: \"\\f114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\f115\";\n}\n.fa-smile-o:before {\n  content: \"\\f118\";\n}\n.fa-frown-o:before {\n  content: \"\\f119\";\n}\n.fa-meh-o:before {\n  content: \"\\f11a\";\n}\n.fa-gamepad:before {\n  content: \"\\f11b\";\n}\n.fa-keyboard-o:before {\n  content: \"\\f11c\";\n}\n.fa-flag-o:before {\n  content: \"\\f11d\";\n}\n.fa-flag-checkered:before {\n  content: \"\\f11e\";\n}\n.fa-terminal:before {\n  content: \"\\f120\";\n}\n.fa-code:before {\n  content: \"\\f121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\f122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\f123\";\n}\n.fa-location-arrow:before {\n  content: \"\\f124\";\n}\n.fa-crop:before {\n  content: \"\\f125\";\n}\n.fa-code-fork:before {\n  content: \"\\f126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\f127\";\n}\n.fa-question:before {\n  content: \"\\f128\";\n}\n.fa-info:before {\n  content: \"\\f129\";\n}\n.fa-exclamation:before {\n  content: \"\\f12a\";\n}\n.fa-superscript:before {\n  content: \"\\f12b\";\n}\n.fa-subscript:before {\n  content: \"\\f12c\";\n}\n.fa-eraser:before {\n  content: \"\\f12d\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\f12e\";\n}\n.fa-microphone:before {\n  content: \"\\f130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\f131\";\n}\n.fa-shield:before {\n  content: \"\\f132\";\n}\n.fa-calendar-o:before {\n  content: \"\\f133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\f134\";\n}\n.fa-rocket:before {\n  content: \"\\f135\";\n}\n.fa-maxcdn:before {\n  content: \"\\f136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\f137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\f138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\f139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\f13a\";\n}\n.fa-html5:before {\n  content: \"\\f13b\";\n}\n.fa-css3:before {\n  content: \"\\f13c\";\n}\n.fa-anchor:before {\n  content: \"\\f13d\";\n}\n.fa-unlock-alt:before {\n  content: \"\\f13e\";\n}\n.fa-bullseye:before {\n  content: \"\\f140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\f141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\f142\";\n}\n.fa-rss-square:before {\n  content: \"\\f143\";\n}\n.fa-play-circle:before {\n  content: \"\\f144\";\n}\n.fa-ticket:before {\n  content: \"\\f145\";\n}\n.fa-minus-square:before {\n  content: \"\\f146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\f147\";\n}\n.fa-level-up:before {\n  content: \"\\f148\";\n}\n.fa-level-down:before {\n  content: \"\\f149\";\n}\n.fa-check-square:before {\n  content: \"\\f14a\";\n}\n.fa-pencil-square:before {\n  content: \"\\f14b\";\n}\n.fa-external-link-square:before {\n  content: \"\\f14c\";\n}\n.fa-share-square:before {\n  content: \"\\f14d\";\n}\n.fa-compass:before {\n  content: \"\\f14e\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\f150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\f151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\f152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\f153\";\n}\n.fa-gbp:before {\n  content: \"\\f154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\f155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\f156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\f157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\f158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\f159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\f15a\";\n}\n.fa-file:before {\n  content: \"\\f15b\";\n}\n.fa-file-text:before {\n  content: \"\\f15c\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\f15d\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\f15e\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\f160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\f161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\f162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\f163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\f164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\f165\";\n}\n.fa-youtube-square:before {\n  content: \"\\f166\";\n}\n.fa-youtube:before {\n  content: \"\\f167\";\n}\n.fa-xing:before {\n  content: \"\\f168\";\n}\n.fa-xing-square:before {\n  content: \"\\f169\";\n}\n.fa-youtube-play:before {\n  content: \"\\f16a\";\n}\n.fa-dropbox:before {\n  content: \"\\f16b\";\n}\n.fa-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.fa-instagram:before {\n  content: \"\\f16d\";\n}\n.fa-flickr:before {\n  content: \"\\f16e\";\n}\n.fa-adn:before {\n  content: \"\\f170\";\n}\n.fa-bitbucket:before {\n  content: \"\\f171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\f172\";\n}\n.fa-tumblr:before {\n  content: \"\\f173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\f174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\f175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\f176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\f177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\f178\";\n}\n.fa-apple:before {\n  content: \"\\f179\";\n}\n.fa-windows:before {\n  content: \"\\f17a\";\n}\n.fa-android:before {\n  content: \"\\f17b\";\n}\n.fa-linux:before {\n  content: \"\\f17c\";\n}\n.fa-dribbble:before {\n  content: \"\\f17d\";\n}\n.fa-skype:before {\n  content: \"\\f17e\";\n}\n.fa-foursquare:before {\n  content: \"\\f180\";\n}\n.fa-trello:before {\n  content: \"\\f181\";\n}\n.fa-female:before {\n  content: \"\\f182\";\n}\n.fa-male:before {\n  content: \"\\f183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\f184\";\n}\n.fa-sun-o:before {\n  content: \"\\f185\";\n}\n.fa-moon-o:before {\n  content: \"\\f186\";\n}\n.fa-archive:before {\n  content: \"\\f187\";\n}\n.fa-bug:before {\n  content: \"\\f188\";\n}\n.fa-vk:before {\n  content: \"\\f189\";\n}\n.fa-weibo:before {\n  content: \"\\f18a\";\n}\n.fa-renren:before {\n  content: \"\\f18b\";\n}\n.fa-pagelines:before {\n  content: \"\\f18c\";\n}\n.fa-stack-exchange:before {\n  content: \"\\f18d\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\f18e\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\f190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\f191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\f192\";\n}\n.fa-wheelchair:before {\n  content: \"\\f193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\f194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\f195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\f196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\f197\";\n}\n.fa-slack:before {\n  content: \"\\f198\";\n}\n.fa-envelope-square:before {\n  content: \"\\f199\";\n}\n.fa-wordpress:before {\n  content: \"\\f19a\";\n}\n.fa-openid:before {\n  content: \"\\f19b\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\f19c\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\f19d\";\n}\n.fa-yahoo:before {\n  content: \"\\f19e\";\n}\n.fa-google:before {\n  content: \"\\f1a0\";\n}\n.fa-reddit:before {\n  content: \"\\f1a1\";\n}\n.fa-reddit-square:before {\n  content: \"\\f1a2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\f1a3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\f1a4\";\n}\n.fa-delicious:before {\n  content: \"\\f1a5\";\n}\n.fa-digg:before {\n  content: \"\\f1a6\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\\f1a7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\f1a8\";\n}\n.fa-drupal:before {\n  content: \"\\f1a9\";\n}\n.fa-joomla:before {\n  content: \"\\f1aa\";\n}\n.fa-language:before {\n  content: \"\\f1ab\";\n}\n.fa-fax:before {\n  content: \"\\f1ac\";\n}\n.fa-building:before {\n  content: \"\\f1ad\";\n}\n.fa-child:before {\n  content: \"\\f1ae\";\n}\n.fa-paw:before {\n  content: \"\\f1b0\";\n}\n.fa-spoon:before {\n  content: \"\\f1b1\";\n}\n.fa-cube:before {\n  content: \"\\f1b2\";\n}\n.fa-cubes:before {\n  content: \"\\f1b3\";\n}\n.fa-behance:before {\n  content: \"\\f1b4\";\n}\n.fa-behance-square:before {\n  content: \"\\f1b5\";\n}\n.fa-steam:before {\n  content: \"\\f1b6\";\n}\n.fa-steam-square:before {\n  content: \"\\f1b7\";\n}\n.fa-recycle:before {\n  content: \"\\f1b8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\f1b9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\f1ba\";\n}\n.fa-tree:before {\n  content: \"\\f1bb\";\n}\n.fa-spotify:before {\n  content: \"\\f1bc\";\n}\n.fa-deviantart:before {\n  content: \"\\f1bd\";\n}\n.fa-soundcloud:before {\n  content: \"\\f1be\";\n}\n.fa-database:before {\n  content: \"\\f1c0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\f1c1\";\n}\n.fa-file-word-o:before {\n  content: \"\\f1c2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\f1c3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\f1c4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\f1c5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\f1c6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\f1c7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\f1c8\";\n}\n.fa-file-code-o:before {\n  content: \"\\f1c9\";\n}\n.fa-vine:before {\n  content: \"\\f1ca\";\n}\n.fa-codepen:before {\n  content: \"\\f1cb\";\n}\n.fa-jsfiddle:before {\n  content: \"\\f1cc\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\f1cd\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\f1ce\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\f1d0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\f1d1\";\n}\n.fa-git-square:before {\n  content: \"\\f1d2\";\n}\n.fa-git:before {\n  content: \"\\f1d3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\f1d4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\f1d5\";\n}\n.fa-qq:before {\n  content: \"\\f1d6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\f1d7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\f1d8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\f1d9\";\n}\n.fa-history:before {\n  content: \"\\f1da\";\n}\n.fa-circle-thin:before {\n  content: \"\\f1db\";\n}\n.fa-header:before {\n  content: \"\\f1dc\";\n}\n.fa-paragraph:before {\n  content: \"\\f1dd\";\n}\n.fa-sliders:before {\n  content: \"\\f1de\";\n}\n.fa-share-alt:before {\n  content: \"\\f1e0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\f1e1\";\n}\n.fa-bomb:before {\n  content: \"\\f1e2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\f1e3\";\n}\n.fa-tty:before {\n  content: \"\\f1e4\";\n}\n.fa-binoculars:before {\n  content: \"\\f1e5\";\n}\n.fa-plug:before {\n  content: \"\\f1e6\";\n}\n.fa-slideshare:before {\n  content: \"\\f1e7\";\n}\n.fa-twitch:before {\n  content: \"\\f1e8\";\n}\n.fa-yelp:before {\n  content: \"\\f1e9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\f1ea\";\n}\n.fa-wifi:before {\n  content: \"\\f1eb\";\n}\n.fa-calculator:before {\n  content: \"\\f1ec\";\n}\n.fa-paypal:before {\n  content: \"\\f1ed\";\n}\n.fa-google-wallet:before {\n  content: \"\\f1ee\";\n}\n.fa-cc-visa:before {\n  content: \"\\f1f0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\f1f1\";\n}\n.fa-cc-discover:before {\n  content: \"\\f1f2\";\n}\n.fa-cc-amex:before {\n  content: \"\\f1f3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\f1f4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\f1f5\";\n}\n.fa-bell-slash:before {\n  content: \"\\f1f6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\f1f7\";\n}\n.fa-trash:before {\n  content: \"\\f1f8\";\n}\n.fa-copyright:before {\n  content: \"\\f1f9\";\n}\n.fa-at:before {\n  content: \"\\f1fa\";\n}\n.fa-eyedropper:before {\n  content: \"\\f1fb\";\n}\n.fa-paint-brush:before {\n  content: \"\\f1fc\";\n}\n.fa-birthday-cake:before {\n  content: \"\\f1fd\";\n}\n.fa-area-chart:before {\n  content: \"\\f1fe\";\n}\n.fa-pie-chart:before {\n  content: \"\\f200\";\n}\n.fa-line-chart:before {\n  content: \"\\f201\";\n}\n.fa-lastfm:before {\n  content: \"\\f202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\f203\";\n}\n.fa-toggle-off:before {\n  content: \"\\f204\";\n}\n.fa-toggle-on:before {\n  content: \"\\f205\";\n}\n.fa-bicycle:before {\n  content: \"\\f206\";\n}\n.fa-bus:before {\n  content: \"\\f207\";\n}\n.fa-ioxhost:before {\n  content: \"\\f208\";\n}\n.fa-angellist:before {\n  content: \"\\f209\";\n}\n.fa-cc:before {\n  content: \"\\f20a\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\f20b\";\n}\n.fa-meanpath:before {\n  content: \"\\f20c\";\n}\n.fa-buysellads:before {\n  content: \"\\f20d\";\n}\n.fa-connectdevelop:before {\n  content: \"\\f20e\";\n}\n.fa-dashcube:before {\n  content: \"\\f210\";\n}\n.fa-forumbee:before {\n  content: \"\\f211\";\n}\n.fa-leanpub:before {\n  content: \"\\f212\";\n}\n.fa-sellsy:before {\n  content: \"\\f213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\f214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\f215\";\n}\n.fa-skyatlas:before {\n  content: \"\\f216\";\n}\n.fa-cart-plus:before {\n  content: \"\\f217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\f218\";\n}\n.fa-diamond:before {\n  content: \"\\f219\";\n}\n.fa-ship:before {\n  content: \"\\f21a\";\n}\n.fa-user-secret:before {\n  content: \"\\f21b\";\n}\n.fa-motorcycle:before {\n  content: \"\\f21c\";\n}\n.fa-street-view:before {\n  content: \"\\f21d\";\n}\n.fa-heartbeat:before {\n  content: \"\\f21e\";\n}\n.fa-venus:before {\n  content: \"\\f221\";\n}\n.fa-mars:before {\n  content: \"\\f222\";\n}\n.fa-mercury:before {\n  content: \"\\f223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\f224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\f225\";\n}\n.fa-venus-double:before {\n  content: \"\\f226\";\n}\n.fa-mars-double:before {\n  content: \"\\f227\";\n}\n.fa-venus-mars:before {\n  content: \"\\f228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\f229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\f22a\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\f22b\";\n}\n.fa-neuter:before {\n  content: \"\\f22c\";\n}\n.fa-genderless:before {\n  content: \"\\f22d\";\n}\n.fa-facebook-official:before {\n  content: \"\\f230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\f231\";\n}\n.fa-whatsapp:before {\n  content: \"\\f232\";\n}\n.fa-server:before {\n  content: \"\\f233\";\n}\n.fa-user-plus:before {\n  content: \"\\f234\";\n}\n.fa-user-times:before {\n  content: \"\\f235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\f236\";\n}\n.fa-viacoin:before {\n  content: \"\\f237\";\n}\n.fa-train:before {\n  content: \"\\f238\";\n}\n.fa-subway:before {\n  content: \"\\f239\";\n}\n.fa-medium:before {\n  content: \"\\f23a\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\f23b\";\n}\n.fa-optin-monster:before {\n  content: \"\\f23c\";\n}\n.fa-opencart:before {\n  content: \"\\f23d\";\n}\n.fa-expeditedssl:before {\n  content: \"\\f23e\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\f240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\f241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\f242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\f243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\f244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\f245\";\n}\n.fa-i-cursor:before {\n  content: \"\\f246\";\n}\n.fa-object-group:before {\n  content: \"\\f247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\f248\";\n}\n.fa-sticky-note:before {\n  content: \"\\f249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\f24a\";\n}\n.fa-cc-jcb:before {\n  content: \"\\f24b\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\f24c\";\n}\n.fa-clone:before {\n  content: \"\\f24d\";\n}\n.fa-balance-scale:before {\n  content: \"\\f24e\";\n}\n.fa-hourglass-o:before {\n  content: \"\\f250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\f251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\f252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\f253\";\n}\n.fa-hourglass:before {\n  content: \"\\f254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\f255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\f256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\f257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\f258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\f259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\f25a\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\f25b\";\n}\n.fa-trademark:before {\n  content: \"\\f25c\";\n}\n.fa-registered:before {\n  content: \"\\f25d\";\n}\n.fa-creative-commons:before {\n  content: \"\\f25e\";\n}\n.fa-gg:before {\n  content: \"\\f260\";\n}\n.fa-gg-circle:before {\n  content: \"\\f261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\f262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\f263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\f264\";\n}\n.fa-get-pocket:before {\n  content: \"\\f265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\f266\";\n}\n.fa-safari:before {\n  content: \"\\f267\";\n}\n.fa-chrome:before {\n  content: \"\\f268\";\n}\n.fa-firefox:before {\n  content: \"\\f269\";\n}\n.fa-opera:before {\n  content: \"\\f26a\";\n}\n.fa-internet-explorer:before {\n  content: \"\\f26b\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\f26c\";\n}\n.fa-contao:before {\n  content: \"\\f26d\";\n}\n.fa-500px:before {\n  content: \"\\f26e\";\n}\n.fa-amazon:before {\n  content: \"\\f270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\f271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\f272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\f273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\f274\";\n}\n.fa-industry:before {\n  content: \"\\f275\";\n}\n.fa-map-pin:before {\n  content: \"\\f276\";\n}\n.fa-map-signs:before {\n  content: \"\\f277\";\n}\n.fa-map-o:before {\n  content: \"\\f278\";\n}\n.fa-map:before {\n  content: \"\\f279\";\n}\n.fa-commenting:before {\n  content: \"\\f27a\";\n}\n.fa-commenting-o:before {\n  content: \"\\f27b\";\n}\n.fa-houzz:before {\n  content: \"\\f27c\";\n}\n.fa-vimeo:before {\n  content: \"\\f27d\";\n}\n.fa-black-tie:before {\n  content: \"\\f27e\";\n}\n.fa-fonticons:before {\n  content: \"\\f280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\f281\";\n}\n.fa-edge:before {\n  content: \"\\f282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\f283\";\n}\n.fa-codiepie:before {\n  content: \"\\f284\";\n}\n.fa-modx:before {\n  content: \"\\f285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\f286\";\n}\n.fa-usb:before {\n  content: \"\\f287\";\n}\n.fa-product-hunt:before {\n  content: \"\\f288\";\n}\n.fa-mixcloud:before {\n  content: \"\\f289\";\n}\n.fa-scribd:before {\n  content: \"\\f28a\";\n}\n.fa-pause-circle:before {\n  content: \"\\f28b\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\f28c\";\n}\n.fa-stop-circle:before {\n  content: \"\\f28d\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\f28e\";\n}\n.fa-shopping-bag:before {\n  content: \"\\f290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\f291\";\n}\n.fa-hashtag:before {\n  content: \"\\f292\";\n}\n.fa-bluetooth:before {\n  content: \"\\f293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\f294\";\n}\n.fa-percent:before {\n  content: \"\\f295\";\n}\n.fa-gitlab:before {\n  content: \"\\f296\";\n}\n.fa-wpbeginner:before {\n  content: \"\\f297\";\n}\n.fa-wpforms:before {\n  content: \"\\f298\";\n}\n.fa-envira:before {\n  content: \"\\f299\";\n}\n.fa-universal-access:before {\n  content: \"\\f29a\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\\f29b\";\n}\n.fa-question-circle-o:before {\n  content: \"\\f29c\";\n}\n.fa-blind:before {\n  content: \"\\f29d\";\n}\n.fa-audio-description:before {\n  content: \"\\f29e\";\n}\n.fa-volume-control-phone:before {\n  content: \"\\f2a0\";\n}\n.fa-braille:before {\n  content: \"\\f2a1\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\\f2a2\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\f2a3\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\f2a4\";\n}\n.fa-glide:before {\n  content: \"\\f2a5\";\n}\n.fa-glide-g:before {\n  content: \"\\f2a6\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\f2a7\";\n}\n.fa-low-vision:before {\n  content: \"\\f2a8\";\n}\n.fa-viadeo:before {\n  content: \"\\f2a9\";\n}\n.fa-viadeo-square:before {\n  content: \"\\f2aa\";\n}\n.fa-snapchat:before {\n  content: \"\\f2ab\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\\f2ac\";\n}\n.fa-snapchat-square:before {\n  content: \"\\f2ad\";\n}\n.fa-pied-piper:before {\n  content: \"\\f2ae\";\n}\n.fa-first-order:before {\n  content: \"\\f2b0\";\n}\n.fa-yoast:before {\n  content: \"\\f2b1\";\n}\n.fa-themeisle:before {\n  content: \"\\f2b2\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\f2b3\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\f2b4\";\n}\n.fa-handshake-o:before {\n  content: \"\\f2b5\";\n}\n.fa-envelope-open:before {\n  content: \"\\f2b6\";\n}\n.fa-envelope-open-o:before {\n  content: \"\\f2b7\";\n}\n.fa-linode:before {\n  content: \"\\f2b8\";\n}\n.fa-address-book:before {\n  content: \"\\f2b9\";\n}\n.fa-address-book-o:before {\n  content: \"\\f2ba\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\f2bb\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\f2bc\";\n}\n.fa-user-circle:before {\n  content: \"\\f2bd\";\n}\n.fa-user-circle-o:before {\n  content: \"\\f2be\";\n}\n.fa-user-o:before {\n  content: \"\\f2c0\";\n}\n.fa-id-badge:before {\n  content: \"\\f2c1\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\f2c2\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\f2c3\";\n}\n.fa-quora:before {\n  content: \"\\f2c4\";\n}\n.fa-free-code-camp:before {\n  content: \"\\f2c5\";\n}\n.fa-telegram:before {\n  content: \"\\f2c6\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\f2c7\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\f2c8\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\f2c9\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\f2ca\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\f2cb\";\n}\n.fa-shower:before {\n  content: \"\\f2cc\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\f2cd\";\n}\n.fa-podcast:before {\n  content: \"\\f2ce\";\n}\n.fa-window-maximize:before {\n  content: \"\\f2d0\";\n}\n.fa-window-minimize:before {\n  content: \"\\f2d1\";\n}\n.fa-window-restore:before {\n  content: \"\\f2d2\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\f2d3\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\f2d4\";\n}\n.fa-bandcamp:before {\n  content: \"\\f2d5\";\n}\n.fa-grav:before {\n  content: \"\\f2d6\";\n}\n.fa-etsy:before {\n  content: \"\\f2d7\";\n}\n.fa-imdb:before {\n  content: \"\\f2d8\";\n}\n.fa-ravelry:before {\n  content: \"\\f2d9\";\n}\n.fa-eercast:before {\n  content: \"\\f2da\";\n}\n.fa-microchip:before {\n  content: \"\\f2db\";\n}\n.fa-snowflake-o:before {\n  content: \"\\f2dc\";\n}\n.fa-superpowers:before {\n  content: \"\\f2dd\";\n}\n.fa-wpexplorer:before {\n  content: \"\\f2de\";\n}\n.fa-meetup:before {\n  content: \"\\f2e0\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n#slideDeck {\n    height: 400px;\n    overflow-y: scroll;\n}\n::-webkit-scrollbar {\n    display: none;\n}\ndiv.slidedeck__slide {\n    background-color: #ccc;\n    margin-bottom: 0.5em;\n    border: 1px solid black;\n}\ntable.slides__table {\n    width: 300px;\n}\ntable.slides__table tr.selected {\n    background-color: #00b8d9;\n}\n.add {\n    font-family: \"FontAwesome\";\n}\ndiv.slidedeck__slide[draggable=\"true\"] {\n    background-color: #00b8d9;\n}\n.slides_background_rect {\n    fill: #ffffff;\n    stroke: #aaaaaa;\n}\n.slides_delay_rect {\n    fill: #dddddd;\n    stroke: #dddddd;\n}\n.slides_delay_resize,\n.slides_duration_resize {\n    fill: white;\n}\n.slides_rect {\n    fill: #f0f0f0;\n    stroke: #dddddd;\n    rx: 5px;\n    ry: 5px;\n}\n.slides_rect[selected=\"true\"] {\n    fill: #00b8d9;\n    stroke: #dddddd;\n}\n.slides_text {\n    fill: #000000;\n}\n.slides_delete_rect {\n    fill: #aaaaaa;\n}\n.slides_placeholder {\n    rx: 5px;\n    ry: 5px;\n    stroke-dasharray: 5;\n    fill-opacity: 0.1;\n    stroke: black;\n    stroke-width: 1px;\n}\n.slides_durationtext {\n    font-size: 12px;\n    font-weight: 600;\n}\napp-provenance-slides {\n    height: 50%;\n    width: 300px;\n    display: block;\n    background-color: #FFF;\n}\n.slides_background_rect {\n    fill: #FFFFFF;\n    opacity: .01;\n    stroke: #aaaaaa;\n}\n.slides_rect {\n    fill: #aaaaaa;\n    opacity: .7;\n    stroke: #dddddd;\n}\n.slides_delay_rect {\n    fill: #dddddd;\n    opacity: .7;\n    stroke: #dddddd;\n}\n.slides_rect[selected=true] {\n    fill: #00b8d9;\n    opacity: .7;\n    stroke: #dddddd;\n}"

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
/* harmony import */ var _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @visualstorytelling/provenance-core */ "./packages/@visualstorytelling/provenance-core/dist/provenance-core.es5.js");
/* harmony import */ var _visualstorytelling_slide_deck_visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @visualstorytelling/slide-deck-visualization */ "./packages/@visualstorytelling/slide-deck-visualization/dist/slide-deck-visualization.es5.js");
/* harmony import */ var _provenance_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../provenance.service */ "./src/app/provenance.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProvenanceSlidesComponent = /** @class */ (function () {
    function ProvenanceSlidesComponent(elementRef, provenance) {
        this.elementRef = elementRef;
        this.provenance = provenance;
    }
    Object.defineProperty(ProvenanceSlidesComponent.prototype, "deck", {
        get: function () {
            return this._deck;
        },
        enumerable: true,
        configurable: true
    });
    ProvenanceSlidesComponent.prototype.ngOnInit = function () {
        this._deck = new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__["ProvenanceSlidedeck"](this.provenance.graph.application, this.provenance.traverser);
        this._deckViz = new _visualstorytelling_slide_deck_visualization__WEBPACK_IMPORTED_MODULE_2__["SlideDeckVisualization"](this._deck, this.elementRef.nativeElement.children[0]);
    };
    ProvenanceSlidesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-provenance-slides',
            template: '<div id="slideDeck"></div>',
            styles: [__webpack_require__(/*! ./provenance-slides.component.css */ "./src/app/provenance-slides/provenance-slides.component.css")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _provenance_service__WEBPACK_IMPORTED_MODULE_3__["ProvenanceService"]])
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

module.exports = "app-provenance-visualization {\n    height: 50%;\n    width: 300px;\n    display: block;\n    background-color: white;\n}\n\n.node {\n    fill: lightsteelblue;\n    stroke: steelblue;\n    cursor: pointer;\n}\n\n.node circle {\n    stroke-width: .3px;\n    opacity: 0.6;\n}\n\n.node circle.keynode {\n    stroke: #000000;\n}\n\n.node circle.intent_none {\n    fill: #b0c4de;\n}\n\n.node circle.intent_exploration {\n    fill: #60aa85;\n}\n\n.node circle.intent_configuration {\n    fill: #b8852c;\n}\n\n.node circle.intent_selection {\n    fill: #286090;\n}\n\n.node circle.intent_derivation {\n    fill: #a94442;\n}\n\n.node circle.intent_provenance {\n    fill: #9210dd;\n}\n\n.node.branch-active {    \n    background-color: #ccc;\n}\n\n.node.branch-active text {\n    display: block;\n}\n\n.node.branch-active.node circle {\n    opacity: 1;\n    \n}\n\n.node.node-active {    \n    stroke: #4ba3bd;    \n}\n\n.node.node-active circle {\n    r: 3;\n}\n\n.node text {\n    display: none;\n    /* fill: white; */\n    fill: #000;\n    stroke-width: 0;\n    font-family: sans-serif;\n}\n\n.link {\n    fill: none;\n    /* stroke: white; */\n    stroke: #000;\n    stroke-width: .2px;\n}\n\n.link.active {\n    /* stroke: white; */\n    stroke: #000;\n    stroke-width: 0.8px;\n}"

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
/* harmony import */ var _visualstorytelling_provenance_tree_visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @visualstorytelling/provenance-tree-visualization */ "./packages/@visualstorytelling/provenance-tree-visualization/dist/provenance-tree-visualization.es5.js");
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
/* harmony import */ var _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @visualstorytelling/provenance-core */ "./packages/@visualstorytelling/provenance-core/dist/provenance-core.es5.js");
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

/***/ "./src/app/slide-annotations/slide-annotations.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/slide-annotations/slide-annotations.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n    position: absolute;\n    top:0;\n    left: 0;\n    color: white;\n    padding: 2em;\n}\n\ninput {\n    background-color: transparent;\n    border: 1px solid transparent;\n    color: white;\n    position: absolute;\n}\n\ninput::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, .7);\n}\n\ninput::-ms-input-placeholder {\n    color: rgba(255, 255, 255, .7);\n}\n\ninput::placeholder {\n    color: rgba(255, 255, 255, .7);\n}\n\ninput:hover {\n    background-color: rgba(255,255,255,.4);\n}\n\ninput:focus {\n    background-color: rgba(255,255,255,.4);\n    border: 1px solid white;\n}\n\n.anchor {\n    width: 10px;\n    height: 10px;\n    position:absolute;\n    background-color: yellow;\n}"

/***/ }),

/***/ "./src/app/slide-annotations/slide-annotations.component.html":
/*!********************************************************************!*\
  !*** ./src/app/slide-annotations/slide-annotations.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button\n  mat-button\n  color=\"primary\"\n  id=\"alignButton\"\n  (click)=\"newAnnotation()\"\n>\n  Add annotation\n</button>\n\n<div *ngFor=\"let annotation of annotations\">\n  <input\n    draggable=\"true\"\n    (dragend)=\"dragEnd(annotation, $event)\"\n    [value]=\"annotation.data.text || ''\"\n    placeholder=\"Change me\"\n    (change)=\"updateAnnotation(annotation, $event.target.value)\"\n    [style.left.px]=\"annotationXY(annotation).x\"\n    [style.top.px]=\"annotationXY(annotation).y\"\n  />\n</div>"

/***/ }),

/***/ "./src/app/slide-annotations/slide-annotations.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/slide-annotations/slide-annotations.component.ts ***!
  \******************************************************************/
/*! exports provided: SlideAnnotationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideAnnotationsComponent", function() { return SlideAnnotationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _provenance_slides_provenance_slides_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provenance-slides/provenance-slides.component */ "./src/app/provenance-slides/provenance-slides.component.ts");
/* harmony import */ var _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @visualstorytelling/provenance-core */ "./packages/@visualstorytelling/provenance-core/dist/provenance-core.es5.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../annotate */ "./src/app/annotate.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SlideAnnotationsComponent = /** @class */ (function () {
    function SlideAnnotationsComponent() {
        // console.log(registry[0].fromScreenCoordinates({x: 100, y: 100}));
        // console.log(toScreenCoordinates({name: 'dummyAnnotator', x: 100, y: 100}));
        this.JSON = JSON;
        this.console = console;
    }
    SlideAnnotationsComponent.prototype.ngOnInit = function () {
        console.log(this.slides.deck.selectedSlide);
    };
    Object.defineProperty(SlideAnnotationsComponent.prototype, "annotations", {
        get: function () {
            var selectedSlide = this.slides.deck.selectedSlide;
            return selectedSlide ? selectedSlide.annotations : [];
        },
        enumerable: true,
        configurable: true
    });
    SlideAnnotationsComponent.prototype.updateAnnotation = function (annotation, value) {
        annotation.data = __assign({}, annotation.data, { text: value });
    };
    SlideAnnotationsComponent.prototype.dragEnd = function (annotation, event) {
        var annotatedCoordinates = Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["fromScreenCoordinates"])({ x: event.clientX, y: event.clientY });
        if (annotatedCoordinates) {
            annotation.data.coordinates = annotatedCoordinates;
        }
    };
    SlideAnnotationsComponent.prototype.annotationXY = function (annotation) {
        if (annotation.data.coordinates) {
            return Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["toScreenCoordinates"])(annotation.data.coordinates);
        }
        return ({ x: 0, y: 0 });
    };
    SlideAnnotationsComponent.prototype.newAnnotation = function () {
        this.slides.deck.selectedSlide.addAnnotation(new _visualstorytelling_provenance_core__WEBPACK_IMPORTED_MODULE_2__["SlideAnnotation"]({ text: '' }));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _provenance_slides_provenance_slides_component__WEBPACK_IMPORTED_MODULE_1__["ProvenanceSlidesComponent"])
    ], SlideAnnotationsComponent.prototype, "slides", void 0);
    SlideAnnotationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-slide-annotations',
            template: __webpack_require__(/*! ./slide-annotations.component.html */ "./src/app/slide-annotations/slide-annotations.component.html"),
            styles: [__webpack_require__(/*! ./slide-annotations.component.css */ "./src/app/slide-annotations/slide-annotations.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SlideAnnotationsComponent);
    return SlideAnnotationsComponent;
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

module.exports = __webpack_require__(/*! /mnt/c/Users/maarten/workspace/brainvis/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map