class UserAuthModel {
  final String id = "";
  final String token = "";
  final String role = "";

  const UserAuthModel({required id, required token, required role});

  factory UserAuthModel.fromJson(Map<String, dynamic> json) {
    return UserAuthModel(
      id: json['_id'] ?? '',
      token: json['token'] ?? '',
      role: json['role'] ?? '',
    );
  }
}
