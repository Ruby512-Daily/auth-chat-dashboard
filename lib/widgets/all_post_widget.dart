import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:auth_dashboard/utils/loading_dialog_manager.dart';
import 'package:auth_dashboard/constants/app_constants.dart';
import './post_list_widget.dart';
import 'package:auth_dashboard/utils/utils.dart';

class AllPostWidget extends ConsumerStatefulWidget {
  const AllPostWidget({super.key});

  @override
  ConsumerState<AllPostWidget> createState() => _ALlPostWidgetState();
}

class _ALlPostWidgetState extends ConsumerState<AllPostWidget> {
  final List<dynamic> postList = [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      getAllAccount(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(top: 32, bottom: 0, left: 16, right: 16),
        width: double.infinity,
        height: double.infinity,
        child: Column(
          children: [
            PostListWidget(
              allPost: postList,
            ),
          ],
        ));
  }

  Future<void> getAllAccount(BuildContext context) async {
    LoadingDialog.show(context, "Loading...");
    final response = await http.get(
      Uri.parse(
          '${kBaseUrl}/api/admin/read_account'), // Use the correct URL of your backend
      headers: <String, String>{
        'Content-Type': 'application/json',
        'Authorization': await getToken() as String,
      },
    );
    LoadingDialog.hide(context);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        postList.addAll(data["accounts"]);
      });
    } else {
      showSnackBar(context, "Load Failed");
    }
  }
}
