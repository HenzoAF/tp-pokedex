/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import persistence.pokemonDAO;

/**
 *
 * @author strudel
 */
public interface Logica {

    public static pokemonDAO pokemonDAO = new pokemonDAO();

    String executa(HttpServletRequest req, HttpServletResponse res) 
            throws Exception;
}
