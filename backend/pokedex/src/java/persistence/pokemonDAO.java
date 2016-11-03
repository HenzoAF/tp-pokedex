/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package persistence;

import negocios.pokemon_data;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.resource.cci.ConnectionFactory;
import javax.servlet.ServletException;

/**
 *
 * @author strudel
 */
public class pokemonDAO {

    private static Connection connection;

    public pokemonDAO() throws SQLException, ClassNotFoundException {
        connection = factory.getConnection();

    }

    public static void remove(pokemon_data p) throws ServletException {
        try {

            PreparedStatement stmt = connection.prepareStatement("DELETE FROM tb_pokemon WHERE id_pokemon = ?");

            stmt.setInt(1, p.getId_pokemon());

            stmt.execute();
            stmt.close();
        } catch (SQLException ex) {
            throw new ServletException(ex);
        }
    }

    public static void altera(pokemon_data p) throws ServletException, SQLException {
        
        pokemon_data pokemon = (pokemon_data) p;
        
            PreparedStatement stmt = connection.prepareStatement("UPDATE tb_pokemon SET nome = ?, weight=?,height=?, primary_type=?, secondary_type=?,sprite=?,prevolucao=? WHERE id_pokemon = ?");
            stmt.setString(1, pokemon.getNome());
            stmt.setFloat(2, pokemon.getWeight());
            stmt.setFloat(3, pokemon.getHeight());
            stmt.setString(4, pokemon.getTipo_primario());
            stmt.setString(5, pokemon.getTipo_secundario());
            stmt.setString(6, pokemon.getSprite());
            stmt.setInt(7, pokemon.getPrevolucao());
            stmt.setInt(8, pokemon.getId_pokemon());

            stmt.execute();
            stmt.close();
   
    }

    public static void insere(pokemon_data p) throws ServletException, SQLException {
        System.out.println("INSERE DAO");

        pokemon_data pokemon = (pokemon_data) p;

        String insert = "INSERT INTO tb_pokemon (nome, weight,height, primary_type, secondary_type,sprite,prevolucao)  VALUES(?,?,?,?,?,?,?)";

        PreparedStatement stmt = connection.prepareStatement(insert);
        stmt.setString(1, pokemon.getNome());
        stmt.setFloat(2, pokemon.getWeight());
        stmt.setFloat(3, pokemon.getHeight());
        stmt.setString(4, pokemon.getTipo_primario());
        stmt.setString(5, pokemon.getTipo_secundario());
        stmt.setString(6, pokemon.getSprite());
        stmt.setInt(7, pokemon.getPrevolucao());

        stmt.execute();
        stmt.close();

    }

    public List getAll() throws SQLException {
        System.out.println("GET ALL DAO");

        String select = "SELECT * FROM tb_pokemon";

        PreparedStatement stmt = connection.prepareStatement(select);
        ResultSet rs = stmt.executeQuery();

        List<pokemon_data> pokemons = new ArrayList<pokemon_data>();

        while (rs.next()) {
            pokemon_data pokemon = new pokemon_data();

            pokemon.setId_pokemon(rs.getInt("id_pokemon"));

            pokemon.setNome(rs.getString("nome"));
            pokemon.setWeight(rs.getFloat("weight"));
            pokemon.setHeight(rs.getFloat("height"));
            pokemon.setSprite(rs.getString("sprite"));
            pokemon.setTipo_primario(rs.getString("primary_type"));
            pokemon.setTipo_secundario(rs.getString("secondary_type"));
            pokemon.setPrevolucao(rs.getInt("prevolucao"));
            pokemons.add(pokemon);
        }

        rs.close();
        stmt.close();

        return pokemons;
    }

    public pokemon_data getbyid(int id) throws SQLException {
        System.out.println("GET BY ID DAO");

        String select = "SELECT * FROM tb_pokemon WHERE id_pokemon = ?";

        PreparedStatement stmt = connection.prepareStatement(select);
        stmt.setInt(1, id);

        ResultSet rs = stmt.executeQuery();
        pokemon_data pokemon = new pokemon_data();

        if (rs.next()) {

            pokemon.setId_pokemon(rs.getInt("id_pokemon"));
            pokemon.setNome(rs.getString("nome"));
            pokemon.setWeight(rs.getFloat("weight"));
            pokemon.setHeight(rs.getFloat("height"));
            pokemon.setSprite(rs.getString("sprite"));
            pokemon.setTipo_primario(rs.getString("primary_type"));
            pokemon.setTipo_secundario(rs.getString("secondary_type"));
            pokemon.setPrevolucao(rs.getInt("prevolucao"));
        }
        rs.close();
        stmt.close();

        return pokemon;
    }

}
