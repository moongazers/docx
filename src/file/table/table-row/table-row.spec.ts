import { expect } from "chai";

import { Formatter } from "export/formatter";

import { TableCell } from "../table-cell";
import { TableRow } from "./table-row";

describe("TableRow", () => {
    describe("#constructor", () => {
        it("should create with no cells", () => {
            const tableRow = new TableRow([]);
            const tree = new Formatter().format(tableRow);
            expect(tree).to.deep.equal({
                "w:tr": [
                    {
                        "w:trPr": [],
                    },
                ],
            });
        });

        it("should create with one cell", () => {
            const tableRow = new TableRow([new TableCell()]);
            const tree = new Formatter().format(tableRow);
            expect(tree).to.deep.equal({
                "w:tr": [
                    {
                        "w:trPr": [],
                    },
                    {
                        "w:tc": [
                            {
                                "w:tcPr": [],
                            },
                            {
                                "w:p": [
                                    {
                                        "w:pPr": [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });
    });

    describe("#getCell", () => {
        it("should get the cell", () => {
            const cell = new TableCell();
            const tableRow = new TableRow([cell]);

            expect(tableRow.getCell(0)).to.equal(cell);
        });

        it("should throw an error if index is out of bounds", () => {
            const cell = new TableCell();
            const tableRow = new TableRow([cell]);

            expect(() => tableRow.getCell(1)).to.throw();
        });
    });

    describe("#addGridSpan", () => {
        it("should merge the cell", () => {
            const tableRow = new TableRow([new TableCell(), new TableCell()]);

            tableRow.addGridSpan(0, 2);
            expect(() => tableRow.getCell(1)).to.throw();
        });
    });

    describe("#mergeCells", () => {
        it("should merge the cell", () => {
            const tableRow = new TableRow([new TableCell(), new TableCell()]);

            tableRow.mergeCells(0, 1);
            expect(() => tableRow.getCell(1)).to.throw();
        });
    });
});
