import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'dart:convert'; // For base64 encoding and decoding
import 'dart:typed_data'; // For handling byte data
import 'package:flutter/material.dart';

bool isMobileView() {
  return Platform.isAndroid || Platform.isIOS;
}

void showSnackBar(BuildContext context, String message) {
  // ScaffoldMessenger.of(context).showSnackBar(
  //   SnackBar(content: Text(message)),
  // );
  Fluttertoast.showToast(
    msg: "${message}",
    toastLength: Toast.LENGTH_LONG,
    gravity: ToastGravity.BOTTOM,
  );
}

Widget add8VerticalSpace() {
  return const SizedBox(
    height: 8,
  );
}

Widget add16VerticalSpace() {
  return const SizedBox(
    height: 16,
  );
}

Widget add24VerticalSpace() {
  return const SizedBox(
    height: 24,
  );
}

Widget add32VerticalSpace() {
  return const SizedBox(
    height: 32,
  );
}

Widget add36VerticalSpace() {
  return const SizedBox(
    height: 36,
  );
}

Widget add64VerticalSpace() {
  return const SizedBox(
    height: 64,
  );
}

Widget add8HorizontalSpace() {
  return const SizedBox(
    width: 8,
  );
}

Widget add16HorizontalSpace() {
  return const SizedBox(
    width: 16,
  );
}

Widget add24HorizontalSpace() {
  return const SizedBox(
    width: 24,
  );
}

Widget add32HorizontalSpace() {
  return const SizedBox(
    width: 32,
  );
}

Widget add36HorizontalSpace() {
  return const SizedBox(
    width: 36,
  );
}

Widget add64HorizontalSpace() {
  return const SizedBox(
    width: 64,
  );
}

Future<void> saveUserData(String token, String id, String role) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString('auth_token', token);
  prefs.setString('_id', id);
  prefs.setString('role', role);
}

Future<String?> getToken() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('auth_token');
}

Future<String?> getID() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('_id');
}

Future<String?> getRole() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('role');
}

Future<void> setMenu(String menu) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  prefs.setString('menu', menu);
}

Future<String?> getMenu() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  return prefs.getString('menu');
}

Uint8List? decodeBase64Image(String base64String) {
  try {
    return base64Decode(base64String);
  } catch (e) {
    print("Error decoding base64 image: $e");
    return null;
  }
}
