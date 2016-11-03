package persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import com.mysql.jdbc.Driver;

public class factory {

    private static final String user = "daw-aluno4";
    private static final String password = "augusto";
    private static final String dataBase = "daw-aluno4";
    private static final String address = "150.164.102.160";
    private static Connection connection;

    /**
     *
     * @throws java.sql.SQLException
     * @return the java.sql.Connection
     */
    public static Connection getConnection() throws SQLException {
        try {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            if (connection == null) {
                connection = DriverManager.getConnection("jdbc:mysql://" + address + "/" + dataBase, user, password);
                System.out.println("CONECTION ESTABILISHED");
            }

            return connection;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
