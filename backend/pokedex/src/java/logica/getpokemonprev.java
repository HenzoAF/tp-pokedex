/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import com.google.gson.Gson;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import negocios.pokemon_data;
import persistence.pokemonDAO;

/**
 *
 * @author afflz
 */
public class getpokemonprev implements Logica {

    pokemonDAO dao;

    @Override
    public void executa(HttpServletRequest req, HttpServletResponse res) throws Exception {
        dao = new pokemonDAO();

        List<pokemon_data> pokemons = new ArrayList<pokemon_data>();

        pokemons = dao.getbyidprev(Integer.parseInt(req.getParameter("id")));

        Gson gson = new Gson();
        String json = gson.toJson(pokemons);

        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(json);

    }

}
