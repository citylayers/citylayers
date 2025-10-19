var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var QPanel = (function (_super) {
    __extends(QPanel, _super);
    function QPanel(parent) {
        var _this = _super.call(this, parent, "id") || this;
        _this.name = CLASSNAMES.Q_PANEL;
        _this.elements = [QHeader, QContainer, QFooter];
        return _this;
    }
    QPanel.prototype.load = function (qasets, answerTree) {
        var _this = this;
        QPanel.totalSteps = qasets.length;
        QPanel.tree = answerTree;
        this.elements.forEach(function (el, i) {
            var element = el == QContainer ? new el(_this.makeId(), "", [qasets, answerTree]) :
                new el(_this.makeId(), "main");
            element.initiate();
            if (element instanceof QContainer) {
                element.load(QPanel.currentStep, i == QPanel.currentStep);
                QPanel.controller = element;
            }
            else {
                element.load([QPanel.back, QPanel.next, QPanel.submit]);
            }
        });
    };
    QPanel.back = function () {
        QPanel.controller.load(QPanel.currentStep - 1);
        QPanel.currentStep -= 1;
        QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    };
    QPanel.next = function () {
        QPanel.controller.load(QPanel.currentStep + 1);
        QPanel.currentStep += 1;
        QFooter.reload(QPanel.currentStep, QPanel.totalSteps);
    };
    QPanel.make_form = function () {
        var d = new FormData();
        if (QPanel.tree.get("image") != undefined &&
            QPanel.tree.get("image") != null &&
            QPanel.tree.get("image") != "") {
            d.set("image", QPanel.tree.get("image"));
        }
        return d;
    };
    QPanel.submit_image = function (dd, indata) {
        fetch('/upload', {
            method: 'POST',
            body: dd
        })
            .then(function (response) {
            response.json().then(function (response) {
                indata.image = response.content;
                QPanel.submit_form(dd, indata);
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    QPanel.submit_form = function (dd, indata) {
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(indata)
        })
            .then(function (response) {
            window.location.href = "/success";
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    QPanel.submit = function () {
        var indata = {
            coords: {
                lat: Position.lat,
                lon: Position.lon
            },
            data: QPanel.tree.out()
        };
        QPanel.currentStep = QPanel.initialStep;
        var d = QPanel.make_form();
        if (d.get("image") != undefined && d.get("image") != null && d.get("image") != "") {
            QPanel.submit_image(d, indata);
        }
        else {
            QPanel.submit_form(d, indata);
        }
    };
    QPanel.controller = undefined;
    QPanel.currentStep = 0;
    QPanel.initialStep = 0;
    QPanel.totalSteps = 0;
    QPanel.tree = undefined;
    return QPanel;
}(ContentPanel));
