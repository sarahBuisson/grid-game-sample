package fr.perso.sudoku;


import fr.perso.sudoku.service.generateCleanedGrid
import fr.perso.sudoku.service.resolveGrid
import kotlin.test.Test


class SudokuServiceTest {
    @Test(timeout = 20000)
    fun shouldGenerateAndCleanFull33With30CasesInitialisedThenResolveIt() {

        var gridClean = generateCleanedGrid(3, 3, 30)
        println(gridClean)
        var resolved = resolveGrid(gridClean)

        println("resolvedGrid")
        println(resolved)
    }
}
