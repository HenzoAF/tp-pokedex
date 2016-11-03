/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package negocios;

/**
 *
 * @author afflz
 */
public class pokemon_data {

    /**
     * @return the prevolucao
     */
    public int getPrevolucao() {
        return prevolucao;
    }

    /**
     * @param preevolucao the prevolucao to set
     */
    public void setPrevolucao(int prevolucao) {
        this.prevolucao = prevolucao;
    }

    /**
     * @return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return the weight
     */
    public float getWeight() {
        return weight;
    }

    /**
     * @param weight the weight to set
     */
    public void setWeight(float weight) {
        this.weight = weight;
    }

    /**
     * @return the height
     */
    public float getHeight() {
        return height;
    }

    /**
     * @param height the height to set
     */
    public void setHeight(float height) {
        this.height = height;
    }

    /**
     * @return the id_pokemon
     */
    public int getId_pokemon() {
        return id_pokemon;
    }

    /**
     * @param id_pokemon the id_pokemon to set
     */
    public void setId_pokemon(int id_pokemon) {
        this.id_pokemon = id_pokemon;
    }

    /**
     * @return the sprite
     */
    public String getSprite() {
        return sprite;
    }

    /**
     * @param sprite the sprite to set
     */
    public void setSprite(String sprite) {
        this.sprite = sprite;
    }

    /**
     * @return the tipo_primario
     */
    public String getTipo_primario() {
        return primary_type;
    }

    /**
     * @param tipo_primario the tipo_primario to set
     */
    public void setTipo_primario(String tipo_primario) {
        this.primary_type = tipo_primario;
    }

    /**
     * @return the tipo_secundario
     */
    public String getTipo_secundario() {
        return secondary_type;
    }

    /**
     * @param tipo_secundario the tipo_secundario to set
     */
    public void setTipo_secundario(String tipo_secundario) {
        this.secondary_type = tipo_secundario;
    }

    private int id_pokemon;
    private String nome;
    private float weight;
    private float height;
    private String sprite;
    private String primary_type;
    private String secondary_type;
    private int prevolucao;

}
