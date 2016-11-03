/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logica;

import com.google.gson.Gson;
import java.io.BufferedReader;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import negocios.pokemon_data;
import persistence.pokemonDAO;

/**
 *
 * @author afflz
 */
public class deletepokemon implements Logica {

    @Override
    public void executa(HttpServletRequest req, HttpServletResponse res) throws Exception {
        System.out.println("DELETE POKEMON");

        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        }

        Gson gson = new Gson();
        pokemon_data pokemon = gson.fromJson(sb.toString(), pokemon_data.class);

        pokemonDAO dao = new pokemonDAO();
        System.out.println(pokemon);

        pokemonDAO.remove(pokemon);
    }

}
