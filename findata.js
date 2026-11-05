/* Findings a user can mark, with the plain-language text the app speaks. Pure data. */
var KF={
list:[
{k:"chondro",label:"Kneecap cartilage softening (chondromalacia)",part:"patella",
 say:"Chondromalacia means the cartilage on the back of the kneecap has softened. It tends to cause an ache at the front of the knee that is worse on stairs, squats and long sitting. The aim is to build the muscles that share the load, mainly the quads and hips, and to work in shallow ranges where the kneecap is pressed least.",
 partSay:"The amber patch on the back of the kneecap marks the softened cartilage you selected.",
 ex:[0,1,2,3,4,6],note:"Build the quads and hips in shallow ranges. Skip deep squats and lunges until your physio says so."},
{k:"mm",label:"Inner meniscus (tear, signal change or wear)",part:"mm",
 say:"The inner meniscus is the cushion on the inside of the knee, between the thigh bone and the shin bone. A tear or a signal change inside it often comes from wear or a twist. Avoid deep bending under load and twisting on a planted foot, and build the muscles around the knee so they take load off the cushion.",
 partSay:"The amber patch at the back of this meniscus marks the finding you selected.",
 ex:[0,1,2,3,4,5],note:"Avoid deep bending under load and twisting on a planted foot."},
{k:"lm",label:"Outer meniscus (tear, signal change or wear)",part:"lm",
 say:"The outer meniscus is the cushion on the outside of the knee, and it is more mobile than the inner one. The same rules apply. Avoid deep bending under load and twisting on a planted foot, and build the muscles around the knee.",
 partSay:"The amber patch on this meniscus marks the finding you selected.",
 ex:[0,1,2,3,4,5],note:"Avoid deep bending under load and twisting on a planted foot."},
{k:"effusion",label:"Joint fluid (effusion, swelling)",
 say:"Effusion means extra fluid inside the joint, drawn in blue. Fluid is the knee reacting to irritation, and it usually settles as the irritation calms down. Keep exercise gentle, keep pain at three out of ten or below, and tell your physio if the swelling increases.",
 ex:[0,1,3,6,7,10],note:"Keep it gentle, pain at 3 out of 10 or below, and tell your physio if swelling increases."},
{k:"oa",label:"Early joint wear (arthritis)",part:"tibia",
 say:"Early wear along the joint line means the cartilage has thinned a little. Regular, low-impact strengthening usually helps with pain and with how the knee works. Stay in the pain-free range and build up slowly.",
 partSay:"The amber band along the joint line marks the early wear you selected.",
 ex:[0,1,2,3,4,5,6,7,8,10],note:"Stay in the pain-free range and build up slowly."},
{k:"acl",label:"ACL sprain or tear",part:"acl",
 say:"The ACL is a ligament deep inside the knee that stops the shin sliding forward. After a sprain, a tear or surgery, rehab depends on your stage and is guided by your physio or surgeon. Use this app only for the exercises they have approved.",
 partSay:"This ligament is tinted amber because you selected it.",
 ex:[0,1,2,3],note:"Only do exercises your physio or surgeon has approved for your stage."},
{k:"mcl",label:"MCL sprain (inner ligament)",part:"mcl",
 say:"The MCL is a broad band on the inner side of the knee that stops it buckling inward. A sprain usually needs a period of protection, then gradual strengthening. Check your stage with your physio before you load it.",
 partSay:"This ligament is tinted amber because you selected it.",
 ex:[0,1,3],note:"Check your stage with your physio before loading it."}
],
none:"You have not marked any findings yet. Open the My findings tab to add them, and they will be drawn on this model.",
right:"Your right knee.",left:"Your left knee.",
intro:"Here is what you marked, drawn on the model.",
outro:"All of this is general information. Your physio knows your knee best, so follow their advice first.",
byKey:{}
};
KF.list.forEach(function(f){KF.byKey[f.k]=f;});
