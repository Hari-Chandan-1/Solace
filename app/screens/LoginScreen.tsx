import {
    Text,
    TouchableOpacity
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={[
        "#0a0a0a",
        "#141414",
      ]}
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 42,
          marginBottom: 12,
          fontWeight: "200",
        }}
      >
        Solace
      </Text>

      <Text
        style={{
          color:
            "rgba(255,255,255,0.55)",
          fontSize: 16,
          marginBottom: 60,
        }}
      >
        Your data follows you
        everywhere.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor:
            "white",
          padding: 20,
          borderRadius: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor:
            "rgba(255,255,255,0.2)",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Continue with Phone
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}