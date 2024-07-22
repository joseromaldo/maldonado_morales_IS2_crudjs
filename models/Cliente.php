<?php
require_once 'Conexion.php';

class Cliente extends Conexion{
    public $cliente_id;
    public $cliente_nombre;
    public $cliente_apellido;
    public $cliente_situacion;

    public function __construct($args = []){
        $this->cliente_id = $args['cliente_id'] ?? null;
        $this->cliente_nombre = $args['cliente_nombre'] ?? '';
        $this->cliente_apellido = $args['cliente_apellido'] ?? '';
        $this->cliente_situacion = $args['cliente_situacion'] ?? '';
    }

    public function guardar (){
        $sql = "INSERT INTO cliente (cliente_nombre, cliente_apellido) VALUES ('$this->cliente_nombre','$this->cliente_apellido')";
        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar(){
        $sql = "SELECT * FROM cliente WHERE cliente_situacion = 1";

        if($this->cliente_nombre !=''){
            $sql .= " and cliente_nombre like '%$this->cliente_nombre%' ";
        }

        if($this->cliente_apellido != ''){
            $sql .= " and cliente_apellido = $this->cliente_apellido ";
        }

        if($this->cliente_id != null){
            $sql .= " and cliente_id = $this->cliente_id";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

    public function modificar(){
        $sql = "UPDATE cliente SET cliente_nombre = '$this->cliente_nombre', cliente_apellido = $this->cliente_apellido WHERE cliente_id = $this->cliente_id";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function eliminar(){
        $sql = "UPDATE cliente SET cliente_situacion = 0 WHERE cliente_id = $this->cliente_id";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }
}