import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Tarea = {
  id: number;
  nombre: string;
  completada: boolean;
};

function generarSaludo(nombre: string): string {
  return `Hola, ${nombre}. Bienvenido a Mi primera aplicacion movil`;
}

export default function App() {
  const [nombre, setNombre] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [enviado, setEnviado] = useState<boolean>(false);
  const [tarea, setTarea] = useState<string>("");
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const handleEntrar = () => {
    if (nombre.trim() !== "" && edad.trim() !== "") {
      setEnviado(true);
    }
  };

  const agregarTarea = () => {
    if (tarea.trim() !== "") {
      setTareas([...tareas, { id: Date.now(), nombre: tarea, completada: false }]);
      setTarea("");
    }
  };

  const completarTarea = (id: number) => {
    setTareas(tareas.map((t) => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  if (!enviado) {
    return (
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.loginBox}>
          <Text style={styles.loginTitulo}>Mi primer intento de app</Text>
          <Text style={styles.loginSub}>Tarea Progra Movil</Text>

          <Text style={styles.loginLabel}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Pedro Lopez"
            placeholderTextColor="#64748b"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.loginLabel}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 18"
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            value={edad}
            onChangeText={setEdad}
          />

          <TouchableOpacity style={styles.boton} onPress={handleEntrar}>
            <Text style={styles.botonTexto}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  const edadNum = parseInt(edad);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi primer intento de app</Text>
        <Text style={styles.headerSub}>Programacion Movil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.value}>{nombre}</Text>
        <Text style={styles.saludo}>{generarSaludo(nombre)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Edad ingresada:</Text>
        <Text style={styles.value}>{edadNum} años</Text>
        <Text style={styles.label}>Resultado:</Text>
        <Text style={[styles.resultado, edadNum >= 18 ? styles.mayorDeEdad : styles.menorDeEdad]}>
          {edadNum >= 18 ? "Mayor de edad" : "Menor de edad"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lista de tareas</Text>
        <TextInput
          style={[styles.input, { marginTop: 8 }]}
          placeholder="Escribe una tarea..."
          placeholderTextColor="#64748b"
          value={tarea}
          onChangeText={setTarea}
        />
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarTarea}>
          <Text style={styles.botonAgregarTexto}>Agregar</Text>
        </TouchableOpacity>

        {tareas.length === 0 && (
          <Text style={styles.vacio}>No hay tareas aun</Text>
        )}

        {tareas.map((item) => (
          <View key={item.id} style={styles.tareaItem}>
            <Text style={[styles.tareaTexto, item.completada && styles.tareaCompletada]}>
              {item.nombre}
            </Text>
            <View style={styles.tareaBotones}>
              <TouchableOpacity style={styles.btnCompletar} onPress={() => completarTarea(item.id)}>
                <Text style={styles.btnCompletarTexto}>{item.completada ? "Deshacer" : "Listo"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarTarea(item.id)}>
                <Text style={styles.btnEliminarTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.botonVolver} onPress={() => setEnviado(false)}>
        <Text style={styles.botonVolverTexto}>Volver</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const COLORS = {
  bg: "#0f172a",
  surface: "#1e293b",
  border: "#334155",
  accent: "#38bdf8",
  text: "#f1f5f9",
  muted: "#94a3b8",
  success: "#4ade80",
  warning: "#fb923c",
  danger: "#f87171",
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    padding: 24,
  },
  loginBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginTitulo: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  loginSub: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 28,
  },
  loginLabel: {
    fontSize: 13,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 16,
  },
  boton: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  botonTexto: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
  },
  scroll: {
    backgroundColor: COLORS.bg,
  },
  container: {
    padding: 20,
    paddingTop: 56,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 12,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 6,
  },
  saludo: {
    fontSize: 15,
    color: COLORS.accent,
    fontWeight: "500",
  },
  resultado: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  mayorDeEdad: {
    color: COLORS.success,
    backgroundColor: "#052e16",
  },
  menorDeEdad: {
    color: COLORS.warning,
    backgroundColor: "#1c0a00",
  },
  botonAgregar: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },
  botonAgregarTexto: {
    color: COLORS.accent,
    fontWeight: "600",
    fontSize: 15,
  },
  vacio: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  tareaItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    gap: 8,
  },
  tareaTexto: {
    color: COLORS.text,
    fontSize: 15,
  },
  tareaCompletada: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  tareaBotones: {
    flexDirection: "row",
    gap: 8,
  },
  btnCompletar: {
    borderWidth: 1,
    borderColor: COLORS.success,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  btnCompletarTexto: {
    color: COLORS.success,
    fontSize: 13,
    fontWeight: "600",
  },
  btnEliminar: {
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  btnEliminarTexto: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "600",
  },
  botonVolver: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  botonVolverTexto: {
    color: COLORS.muted,
    fontWeight: "600",
    fontSize: 15,
  },
});
