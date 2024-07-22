<?php
abstract class Conexion {

    protected static $conexion = null;

    public function connectar(): PDO 
    {
         
        if(!self::$conexion){

            try {
               self::$conexion = new PDO("informix:host=host.docker.internal; service=9088;database=tienda; server=informix; protocol=onsoctcp;EnableScrollableCursors=1", "informix", "in4mix");
                self::$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           
            } catch (PDOException $e) {
                echo "No hay conexión a la Base de Datos";
                echo "<br>";
                echo $e->getMessage();
                self::$conexion = null;
                return null;
            }
        }

        return self::$conexion;
    }
    //Metodos para las sentencias sql

    public function ejecutar($sql){
        $conexion = self::connectar();
        $sentencia = $conexion->prepare($sql);
        $resultado = $sentencia->execute();
        $idInsertado = $conexion->lastInsertId();

        return[
            "resultado" => $resultado,
            "id" => $idInsertado
        ];
    }

    //Metodo para consultar infomación

    public function servir($sql){
        $conexion = self::connectar();
        $sentencia = $conexion->prepare($sql);
        $sentencia->execute();
        $data = $sentencia->fetchAll(PDO::FETCH_ASSOC);

        $datos = [];
        foreach ($data as $k => $v){
            $datos[] = array_change_key_case($v, CASE_LOWER);
        }

        return $datos;
    }

    public static function getConexion(): PDO{
        self::connectar();
        return self::$conexion;
    }
}